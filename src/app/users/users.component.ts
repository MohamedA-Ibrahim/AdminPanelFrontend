import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];
}
