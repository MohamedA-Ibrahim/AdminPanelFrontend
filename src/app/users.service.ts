import { inject, Injectable } from '@angular/core';
import { AddUser } from './add-user/add-user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './User';
import { environment } from '../environments/environment';
import { OrderBy } from './users/OrderBy';

@Injectable({ providedIn: 'root' })
export class UsersService {
  baseUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getUsers() {
    const url = this.baseUrl + '/users';

    return this.httpClient.get<User[]>(url);
  }
  getUsersFiltered(
    search: string | null,
    orderASC: boolean,
    orderBy: OrderBy | null
  ) {
    const url = this.baseUrl + '/users';

    let params = new HttpParams().set('orderASC', orderASC);
    if (search) params = params.set('search', search);
    if (orderBy !== null) params = params.set('orderBy', orderBy);

    return this.httpClient.get<User[]>(url, {
      params: params,
      observe: 'response',
    });
  }
  addUser(user: AddUser) {
    const url = this.baseUrl + '/users';

    return this.httpClient.post<User>(url, user);
  }

  removeUser(id: string) {
    const url = `${this.baseUrl}/users/${id}`;

    return this.httpClient.delete<void>(url);
  }

  getUserDetails(id: string) {
    const url = `${this.baseUrl}/users/${id}`;

    return this.httpClient.get<User>(url);
  }
}
