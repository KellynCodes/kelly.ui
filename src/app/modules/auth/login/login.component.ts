import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginDto } from '../../../data/Dto/auth/login.dto';
import { AppState } from '../../../state/app/app.state';
import * as AuthActions from "../../../state/auth/auth.action";
import * as SharedAction from "../../../state/shared/shared.action";
import * as sharedSelector from "../../../state/shared/shared.selector";

@Component({
  selector: 'kelly-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private store: Store<AppState>) { }
  IsFetching!: boolean;
  hidePassword!: boolean;
  loginForm!: FormGroup;
  errorMessage!: string | null;
  IsLoading$ = this.store.select(sharedSelector.getLoading);
  errorMessage$ = this.store.select(sharedSelector.getErrorMessage);


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, timeOut);
  }

  Login(): void {
    if (!this.loginForm.valid) {
      this.errorMessage = 'All the fields are required.';
      this.setTimeOut(3000);
      return;
    }
    const loginCredentials: LoginDto = { email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.store.dispatch(SharedAction.setLoadingSpinner({IsLoading: true }));
    this.store.dispatch(AuthActions.LoginRequest({ credentails: loginCredentials }));
  }
}
