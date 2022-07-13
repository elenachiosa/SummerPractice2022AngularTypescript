import {
  AfterViewInit,
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
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit, AfterViewInit {
  usesMockData = false;

  mockUsers: User[] = [];

  users$!: Observable<User[]>;
  users: User[] = [];
  usersCopy: User[] = [];
  userDataSubscription: Subscription = Subscription.EMPTY;
  userPostSubscription: Subscription = Subscription.EMPTY;

  @ViewChild('filterInput') filterInput!: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.runOperatorExamples();
    // this.runSubjectExamples();

    this.getMockUsers();
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.onInputChange();
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.userPostSubscription.unsubscribe();
  }

  getMockUsers(): void {
    this.mockUsers = this.userService.getMockUsers();
    this.users$ = this.userService.getUsers();
  }

  addMockUser(): void {
    let newUser: User = {
      id: '0',
      role: 'admin',
      name: 'Ion Ionel',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
      age: 88,
    };
    this.userService.addMockUser(newUser);
  }

  removeMockUser(): void {
    this.userService.removeMockUser('some-id');
  }

  getUsers(): void {
    this.userDataSubscription = this.users$.subscribe((data) => {
      this.users = data;
      this.usersCopy = data;
    });
  }

  addUser(): void {
    let newUser: User = {
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
    const userId = this.mockUsers[0].id ? this.mockUsers[0].id : '0';

    this.userPostSubscription = this.userService.removeUser(userId).subscribe({
      next: () => {
        console.log('👤➖ User removed successfully!');
        this.users.shift();
      },
    });
  }

  toggleData(): void {
    this.usesMockData = !this.usesMockData;
  }

  runOperatorExamples(): void {
    /* from + map */
    // from(this.mockUsers)
    //   .pipe(
    //     map((value) => {
    //       value.age = value.age + 10;
    //       return value;
    //     })
    //   )
    //   .subscribe((value) => console.log('Items emitted one by one', value));
    /* of */
    // of(this.mockUsers).subscribe((value) => console.log('All items are emitted once', value));
    /* from + filter */
    // from(this.mockUsers)
    //   .pipe(filter(value => value.age % 2 !== 0))
    //   .subscribe((value) => console.log('Has an odd number for age', value));
    /* reduce */
    // from(this.mockUsers)
    //   .pipe(reduce((total: number, user: User) => total + user.age, 0))
    //   .subscribe((total: number) => console.log('Total: ', total));
  }

  runSubjectExamples(): void {
    const myObservable$ = new Observable((value) => value.next(Math.random()));

    myObservable$.subscribe((value) => console.log(value));
    myObservable$.subscribe((value) => console.log(value));

    console.log('------------- Subject: ---------------');

    const mySubject$ = new Subject();

    mySubject$.subscribe((value) => console.log(value));
    mySubject$.subscribe((value) => console.log(value));

    mySubject$.next(Math.random());

    console.log('------------- ReplaySubject: ---------------');

    const mySubject2$ = new ReplaySubject();
    mySubject2$.next(Math.random());

    mySubject2$.subscribe((value) => console.log(value));
    mySubject2$.subscribe((value) => console.log(value));
  }

  /** Filter example rxjs */
  onInputChange(): void {
    fromEvent(this.filterInput.nativeElement as HTMLInputElement, 'input')
      .pipe(
        map((value) => (value.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        if (searchTerm) {
          console.log(searchTerm);
          this.users = this.filterUsers(searchTerm);
        } else {
          this.users = this.usersCopy;
        }
      });
  }

  filterUsers(searchTerm: string): User[] {
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }
}
