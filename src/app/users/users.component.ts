import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersTableComponent } from "./users-table/users-table.component";

@Component({
  selector: 'app-users',
  imports: [
    RouterLink,
    MatProgressSpinnerModule,
    UsersTableComponent,
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  isError = false;

  private usersService = inject(UsersService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.isLoading = true;

    this.usersService.getUsers().subscribe({
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.removeUser(id).subscribe({
          next: () => {
            this.users = this.users.filter((user) => user.id !== id);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to delete user: ' + err.error, 'error');
          },
        });
      }
    });
  }
}
