import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  Subscription,
  from,
  of,
  map,
  reduce,
  filter,
  distinctUntilChanged,
  Subject,
  ReplaySubject,
  fromEvent,
  debounceTime,
} from 'rxjs';

import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  users$!: Observable<User[]>;
  users: User[] = [];
  userDataSubscription: Subscription = Subscription.EMPTY;
  userPostSubscription: Subscription = Subscription.EMPTY;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.userPostSubscription.unsubscribe();
  }

  getUsers(): void {
    this.users$ = this.userService.getUsers();
    this.userDataSubscription = this.users$.subscribe((data) => {
      this.users = data;
    });
  }

  addUser(): void {
    let newUser: User = {
      id: null,
      name: 'Gigel Ionel',
      avatar:
        'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80',
      role: 'admin',
      age: 99,
    };

    this.userPostSubscription = this.userService.addUser(newUser).subscribe({
      next: (data: User) => {
        console.log('👤➕ User added successfully!');
        this.users.unshift(data);
      },
    });
  }

  removeUser(): void {
    const userId = this.users[0].id ? this.users[0].id : '0';

    this.userPostSubscription = this.userService.removeUser(userId).subscribe({
      next: () => {
        console.log('👤➖ User removed successfully!');
        this.users.shift();
      },
    });
  }

}
