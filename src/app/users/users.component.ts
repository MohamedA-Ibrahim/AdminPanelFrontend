import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../User';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
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
}
