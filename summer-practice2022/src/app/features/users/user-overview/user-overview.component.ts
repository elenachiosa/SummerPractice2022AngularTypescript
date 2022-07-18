import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  filter,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  reduce,
  fromEvent,
} from 'rxjs';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {
  mockUsers: User[] = [];
  mockUsersCopy: User[] = [];

  @ViewChild('filterInput') filterInput!: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getMockUsers();

    // this.runOperatorExamples();
    // this.runSubjectExamples();
  }

  ngAfterViewInit(): void {
    this.onInputChange();
  }

  getMockUsers(): void {
    this.mockUsers = this.userService.getMockUsers();
    this.mockUsersCopy = this.mockUsers;
  }

  addMockUser(): void {
    let newUser: User = {
      id: '123456',
      role: 'admin',
      name: 'Ion Ionel',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
      age: 88,
    };
    this.userService.addMockUser(newUser);
  }

  removeMockUser(): void {
    this.userService.removeMockUser('3');
    this.getMockUsers();
  }

  runOperatorExamples(): void {
    /* from + map */
    from(this.mockUsers)
      .pipe(
        map((value) => {
          value.age = value.age + 10;
          return value;
        })
      )
      .subscribe((value) => console.log('Items emitted one by one', value));
    /* of */
    of(this.mockUsers).subscribe((value) =>
      console.log('All items are emitted once', value)
    );
    /* from + filter */
    from(this.mockUsers)
      .pipe(filter((value) => value.age % 2 !== 0))
      .subscribe((value) => console.log('Has an odd number for age', value));
    /* reduce */
    from(this.mockUsers)
      .pipe(reduce((total: number, user: User) => total + user.age, 0))
      .subscribe((total: number) => console.log('Total: ', total));
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
          this.mockUsers = this.filterUsers(searchTerm);
        } else {
          this.mockUsers = this.mockUsersCopy;
        }
      });
  }

  filterUsers(searchTerm: string): User[] {
    return this.mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }

  sortMockUsers(column: string): void {
    if (column === 'age') {
      this.mockUsers.sort(
        (firstUser: User, secondUser: User) => firstUser.age - secondUser.age
      );
    } else {
      this.mockUsers.sort((firstUser: User, secondUser: User) =>
        String(firstUser[column as keyof User])
          .toLocaleLowerCase()
          .localeCompare(
            String(secondUser[column as keyof User]).toLocaleLowerCase()
          )
      );
    }
  }
}
