import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { OrderBy } from './OrderBy';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatProgressSpinnerModule, UsersTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  isError = false;
  orderBy: OrderBy | null = null;
  search: string | null = null;
  orderASC = false;

  private usersService = inject(UsersService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.getUsers();
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
          this.users = resData;
        },
        error: (err) => {
          console.error(err.message);

          this.isError = true;
          this.snackBar.open('Failed to get users due to server error', 'ok', {
            duration: 7000,
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
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
