import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/services/user.service';
import { ErrorsFirebaseHelper } from '../core/helpers/errors-firebase.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public showPassword = false;
  public error = '';

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public togglePasswordVisibility(): void {
    const password = document.querySelector(
      'mat-form-field section input',
    ) as HTMLInputElement;

    if (password.type === 'password') {
      password.type = 'text';
      this.showPassword = true;
    } else if (password.type === 'text') {
      password.type = 'password';
      this.showPassword = false;
    }
  }

  public onSubmit() {
    this._userService
      .loginWithCredentials(this.loginForm.value)
      .then(() => {
        this._router.navigate(['/productos']);
      })
      .catch((error) => {
        console.log(error.code);
        this.error = ErrorsFirebaseHelper.getError(error.code);
      });
  }
}
