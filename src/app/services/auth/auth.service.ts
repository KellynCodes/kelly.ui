import { Inject, Injectable } from '@angular/core';
import { HttpResponse } from '../../data/Dto/auth/http.response';
import { LoginDto } from '../../data/Dto/auth/login.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignUpDto } from '../../data/Dto/auth/signup.dto';
import { localStorageToken } from '../../extension/local.storage';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private http: HttpClient
  ) {}

  Login(model: LoginDto): Observable<HttpResponse<{ token: string }>> {
    if (model == null) {
      throw new Error('model value cannot be null');
    }
    const url: string = `${environment.apiUrl}/auth/login`;
    return this.http.post<HttpResponse<{ token: string }>>(url, model);
  }

  signUp(model: SignUpDto): Observable<HttpResponse<{ token: string }>> {
    if (model == null) {
      throw new Error('model value cannot be null');
    }
    const url: string = `${environment.apiUrl}/auth/sign-up`;
    return this.http.post<HttpResponse<{ token: string }>>(url, model);
  }

  postImage(file: FormData): Observable<HttpResponse<{ ImgPath: string }>> {
    const url: string = `${environment.apiUrl}/uploads/user`;
    return this.http.post<HttpResponse<{ ImgPath: string }>>(url, file);
  }

  saveUserSession(user: any): boolean {
    if (user == null) {
      return false;
    }
    this.localStorage.setItem('token', user.data.token);
    return true;
  }

  logout(): boolean {
    this.localStorage.removeItem('token');
    return true;
  }
}
