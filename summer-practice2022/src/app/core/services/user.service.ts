import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models';
import { users } from '../mocks/users-mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Service with mock data
   */

  getMockUsers(): User[] {
    return users;
  }

  addMockUser(user: User): void {
    // users.push(user);
    users.unshift(user);
  }

  /**
   * Service with real data
   */

  baseUrl = 'https://174cb5aa-8593-493d-80e3-4fe349ec81c3.mock.pstmn.io/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.baseUrl + 'user', user);
  }
}