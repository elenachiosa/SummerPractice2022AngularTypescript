import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  nameMyModel: string | undefined;
  userFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl(''),
      password: new FormControl(''),
      reminder: new FormControl(false),
    });

    this.userFormGroup.valueChanges.subscribe((values: unknown) => {
      console.log('my values', values);
    });

    this.route.url.subscribe((info) => {
      //console.log('Info', info);
    });

    this.route.queryParams.subscribe((params) => {
      //console.log('query Params', params);
    });
  }

  onModelChange(event: string): void {
    //this.nameMyModel = event;
    console.log('event', event);
  }

  onSubmitForm(event: FormGroupDirective): void {
    console.log(event);
  }

  setValueFormGroup(): void {
    this.userFormGroup.setValue({
      name: 'Test name',
      username: 'Test username',
      password: '123456',
      reminder: true,
    });
  }

  patchValueFormGroup(): void {
    this.userFormGroup.patchValue({
      password: 'summerpractice',
    });
  }

  resetValues(): void {
    this.userFormGroup.reset();
  }
}
