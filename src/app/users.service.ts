import { Injectable } from '@angular/core';
import { AddUser } from './add-user/add-user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  addUser(user: AddUser) {}
}
