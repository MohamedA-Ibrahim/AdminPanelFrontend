import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;

  private usersService = inject(UsersService);

  ngOnInit() {
    this.isLoading = true;

    this.usersService.getUsers().subscribe({
      next: (resData) => {
        this.users = resData;
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

  columnsToDisplay = ['firstName', 'lastName', 'email', 'phone','action'];
}
