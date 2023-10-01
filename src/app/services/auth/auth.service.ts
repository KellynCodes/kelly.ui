import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import { localStorageToken } from '../../extension/local.storage';
import * as authActions from '../../modules/auth/state/auth/auth.action';
import { AppState } from '../../state/app/app.state';
import { LoginSuccessDto } from './Dto/LoginSuccessDto';
import { UploadFileResponseDto } from './Dto/UploadFileResponseDto';
import { LoginDto } from './Dto/login.dto';
import { SignUpDto } from './Dto/signup.dto';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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
    console.log(model);
    const url: string = `${environment.apiUrl}/auth/sign-up`;
    return this.http.post<HttpResponse>(url, model);
  }

  postFile(file: FormData, userId: string): Observable<UploadFileResponseDto> {
    const folder = file.get('folder');
    const url: string = `${environment.apiUrl}/files/upload?folder=${folder}?userId=${userId}`;
    return this.http.post<UploadFileResponseDto>(url, file);
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
}
