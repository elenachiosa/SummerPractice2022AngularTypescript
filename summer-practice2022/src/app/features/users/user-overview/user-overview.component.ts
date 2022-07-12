import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {
  usesMockData = false;

  mockUsers: User[] = [];

  users$!: Observable<User[]>;
  users: User[] = [];
  userDataSubscription: Subscription = Subscription.EMPTY;
  userPostSubscription: Subscription = Subscription.EMPTY;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.mockUsers = this.userService.getMockUsers();

    this.users$ = this.userService.getUsers();
    this.userDataSubscription = this.users$.subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.userPostSubscription.unsubscribe();
  }

  addMockUser(): void {
    let newUser: User = {
      id: '0',
      role: 'admin',
      name: 'Ion Ionel',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
    };
    this.userService.addMockUser(newUser);
  }

  addUser(): void {
    let newUser: User = {
      name: 'Gigel Ionel',
      avatar:
        'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80',
      role: 'admin',
    };

    this.userPostSubscription = this.userService.addUser(newUser).subscribe({
      next: (data: User) => {
        console.log('✅ User added!');
        this.users.unshift(data);
      },
    });
  }

  toggleData(): void {
    this.usesMockData = !this.usesMockData;
  }
}
