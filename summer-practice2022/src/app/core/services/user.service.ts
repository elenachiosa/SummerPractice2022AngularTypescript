import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

import { User } from 'src/app/shared/models';
import { users } from '../mocks/users-mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://174cb5aa-8593-493d-80e3-4fe349ec81c3.mock.pstmn.io/';

  constructor(private http: HttpClient) {}

  /** Mock data */

  getMockUsers(): User[] {
    return users;
  }

  addMockUser(user: User): void {
    users.unshift(user);
  }

  removeMockUser(id: string): void {
    users.shift();
  }

  /** API data */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}users`, user).pipe(
      catchError((error: ErrorEvent) => {
        console.error(error);
        return throwError(() => new Error('Error occured!'));
      })
    );
  }

  removeUser(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}users/${id}`).pipe(
      catchError((error: ErrorEvent) => {
        console.error(error);
        return throwError(() => new Error('Error occured!'));
      })
    );
  }
}
