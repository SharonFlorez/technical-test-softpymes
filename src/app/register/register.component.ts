import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/services/user.service';
import { ErrorsFirebaseHelper } from '../core/helpers/errors-firebase.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});
  public showPassword = false;
  public error = '';

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
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
      .register(this.registerForm.value)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error.code);
        this.error = ErrorsFirebaseHelper.getError(error.code);
      });
  }
}
