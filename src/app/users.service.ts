import { inject, Injectable } from '@angular/core';
import { AddUser } from './add-user/add-user.model';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getUsers() {
    const url = this.baseUrl + '/users';

    return this.httpClient.get<User[]>(url);
  }

  addUser(user: AddUser) {
    const url = this.baseUrl + '/users';

    return this.httpClient.post<User>(url, user);
  }

  removeUser(id: string) {
    const url = `${this.baseUrl}/users/${id}`;

    return this.httpClient.delete<void>(url);
  }

  getUserDetails(id: string){
    const url = `${this.baseUrl}/users/${id}`;

    return this.httpClient.get<User>(url);
  }
}
