import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { OrderBy } from './OrderBy';
import { SnackBarContentComponent } from '../snack-bar-content/snack-bar-content.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatProgressSpinnerModule, UsersTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = false;
  isError = false;
  orderBy: OrderBy | null = null;
  search: string | null = null;
  orderASC = false;

  private readonly usersService = inject(UsersService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  private addedUserId?: string;
  private retryCount = 0;
  private retrySub?: Subscription;
  private queryParamsSub?: Subscription;

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.addedUserId = params['id'] ?? null;
      this.retryCount = 0;
      this.getUsers();
    });
  }

  ngOnDestroy() {
    this.retrySub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsers() {
    this.isLoading = true;

    this.usersService
      .getUsersFiltered(this.search, this.orderASC, this.orderBy)
      .subscribe({
        next: (resData) => {
          this.users = resData.body!;

          const cacheStatus = resData.headers.get('X-Cache');

          this.snackBar.openFromComponent(SnackBarContentComponent, {
            data: {
              content:
                cacheStatus === 'HIT'
                  ? 'Loaded from cache'
                  : 'Loaded from database',
              success: true,
            },
            duration: 4000,
          });

          if (this.addedUserId) {
            const found = this.users.some((u) => u.id === this.addedUserId);

            if (!found) {
              if (this.retryCount < 3) {
                this.retryCount++;
                this.pollForUser();
              } else {
                this.addedUserId = undefined;
                this.snackBar.openFromComponent(SnackBarContentComponent, {
                  data: {
                    content:
                      'User not found after several attempts. Please try again later.',
                    success: false,
                  },
                  duration: 4000,
                });
              }
            } else {
              // User is found, clear id so we stop retrying
              this.addedUserId = undefined;
              this.snackBar.openFromComponent(SnackBarContentComponent, {
                data: {
                  content: 'New user has been added!',
                  success: true,
                },
                duration: 3000,
              });
            }
          }
        },
        error: (err) => {
          console.error(err.message);
          this.isError = true;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  pollForUser() {
    const snackBar = this.snackBar.openFromComponent(SnackBarContentComponent, {
      data: { content: 'Still processing...', success: true },
      duration: 4000,
    });

    this.retrySub = snackBar.afterDismissed().subscribe(() => {
      if (this.addedUserId) {
        this.getUsers();
      }
    });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: 'user',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.removeUser(id).subscribe({
          next: () => {
            this.users = this.users.filter((user) => user.id !== id);
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'Deleted!',
                message: 'User has been deleted.',
              },
            });
          },
          error: (err) => {
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'Error',
                message: 'Failed to delete user: ' + err.error,
              },
            });
          },
        });
      }
    });
  }

  openDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });
  }

  sortChanged(sort: { orderASC: boolean; orderBy: OrderBy | null }) {
    this.orderASC = sort.orderASC;
    this.orderBy = sort.orderBy;

    this.getUsers();
  }

  filterChanged(filter: string) {
    this.search = filter;
    this.getUsers();
  }
}
