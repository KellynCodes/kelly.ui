import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginDto } from '../../../services/auth/Dto/login.dto';
import { TimeOut } from '../../../services/utils/timeout.util';
import { AppState } from '../../../state/app/app.state';
import * as authActions from '../state/auth/auth.action';
import * as authSelectors from '../state/auth/auth.selector';

@Component({
  selector: 'kelly-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private store: Store<AppState>,
    private timeoutUtil: TimeOut
  ) { }
  IsFetching!: boolean;
  hidePassword!: boolean;
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  IsLoading$ = this.store.select(authSelectors.getLoading);
  errorMessage$ = this.store.select(authSelectors.getErrorMessage);


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  Login(): void {
    if (!this.loginForm.valid) {
      this.errorMessage = 'All the fields are required.';
      this.errorMessage = this.timeoutUtil.setTimeOut(50);
      return;
    }
    const loginCredentials: LoginDto = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    this.store.dispatch(authActions.setAuthLoadingSpinner({
      IsLoading: true,
      errorMessage: null,
      expiryTimeStamp: null,
      accessToken: null,
      refreshToken: null,
      user: null
    }));
    this.store.dispatch(authActions.LoginRequest({ model: loginCredentials }));
  }
}
