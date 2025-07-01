import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dummy_users } from '../dummy-users';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = dummy_users;
}
