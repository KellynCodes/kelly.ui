import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { localStorageToken } from './local.storage';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  token!: string | null;
  constructor(@Inject(localStorageToken) private localStorage: Storage) {
    this.token = this.localStorage.getItem('token');
  }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    });
    return next.handle(request);
  }
}
