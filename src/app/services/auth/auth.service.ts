import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import { localStorageToken } from '../../extension/local.storage';
import * as authActions from '../../modules/auth/state/auth/auth.action';
import { AppState } from '../../state/app/app.state';
import { LoginSuccessDto } from './Dto/LoginSuccessDto';
import { LoginDto } from './Dto/login.dto';
import { VerifyEmailDto } from './Dto/verify-email.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  Login(model: LoginDto): Observable<HttpResponse<LoginSuccessDto>> {
    if (model == null) {
      debugger;
      throw new Error('model value cannot be null');
    }
    const url: string = `${environment.apiUrl}/auth/sign-in`;
    return this.http.post<HttpResponse<LoginSuccessDto>>(url, model);
  }

  signUp(model: FormData): Observable<HttpResponse> {
    if (model == null) {
      throw new Error('model value cannot be null');
    }
    const url: string = `${environment.apiUrl}/auth/sign-up`;
    return this.http.post<HttpResponse>(url, model);
  }


  verifyEmail(payload: VerifyEmailDto): Observable<HttpResponse<VerifyEmailDto>> {
    const model = { email: payload.email, otp: payload.otp };
    const url: string = `${environment.apiUrl}/auth/verify-email`;
    return this.http.post <HttpResponse<VerifyEmailDto>>(url, model);
  }


  logout(): boolean {
    this.localStorage.removeItem('authUser');
    this.store.dispatch(authActions.LogoutSuccess());
    return true;
  }

  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      if (!formGroup.controls) {
        return null;
      }

      const controlToMatch = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!controlToMatch || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (controlToMatch.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value || '';
      const upperCaseCharacters = /[A-Z]+/g;
      const lowerCaseCharacters = /[a-z]+/g;
      const numberCharacters = /[0-9]+/g;
      const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (!upperCaseCharacters.test(value)) {
        return { passwordUppercase: true };
      }
      if (!lowerCaseCharacters.test(value)) {
        return { passwordLowercase: true };
      }
      if (!numberCharacters.test(value)) {
        return { passwordNumber: true };
      }
      if (!specialCharacters.test(value)) {
        return { passwordSpecial: true };
      }
      return null;
    };
  }
}
