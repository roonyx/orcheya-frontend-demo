import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { CurrentUserService } from '../../services/current-user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ValidateLatin } from '../../validators/latin.validator';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html'
})
export class UserSettingFormComponent implements OnInit {
  @Input() private navigateTo: string[] = [];
  public form: FormGroup;
  private respErrors: Object = {};
  private updatedUser = new User();
  public timing = [
    '08:00 - 17:00',
    '09:00 - 18:00',
    '10:00 - 19:00',
    '11:00 - 20:00',
    'flexible'
  ];

  public role = [
    'Developer',
    'HR',
    'Sales',
    'Project Manager',
    'Lead Generation',
    'CEO',
    'CTO',
    'COO'
  ];

  constructor(
    public currentUser: CurrentUserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.currentUser.name, [Validators.required, ValidateLatin]],
      surname: [this.currentUser.surname, [Validators.required, ValidateLatin]],
      birthday: [new Date(this.currentUser.birthday), [Validators.required]],
      sex: [this.currentUser.sex, []],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      github: [this.currentUser.github, []],
      bitbucket: [this.currentUser.bitbucket, []],
      skype: [this.currentUser.skype, []],
      phone: [this.currentUser.phone, [Validators.required]],
      timing: [this.currentUser.timing, [Validators.required]],
      role: [this.currentUser.role, [Validators.required]]
    });
  }

  public hasError(controlName: string): boolean {
    return (
      (this.form.get(controlName).dirty && this.form.get(controlName).invalid)
      || this.respErrors[controlName]
    );
  }

  public updateSettings() {
    if (!this.form.valid) {
      return;
    }

    this.updatedUser._fromJSON(this.form.value);

    this.currentUser
      .updateSettings(this.updatedUser)
      .subscribe(
        () => this.respErrors = {},
        (err: HttpErrorResponse) => {
          if (!err.error['status'] && !err.error['exception']) {
            this.respErrors = err.error;
          }
        },
        () => {
          if (this.navigateTo.length) {
            this.router.navigate(this.navigateTo);
          }
        });
  }

  public textError(controlName: string): string {
    if (!this.hasError(controlName)) {
      return '';
    }

    if (this.form.get(controlName).errors) {
      if (this.form.get(controlName).errors['required']) {
        return `${controlName} is required`;
      } else if (this.form.get(controlName).errors['email']) {
        return `${controlName} is not valid email`;
      } else if (this.form.get(controlName).errors['validLatin']) {
        return `${controlName} should contain only latin characters`;
      }
    }

    if (this.respErrors[controlName]) {
      return this.respErrors[controlName];
    }
  }
}
