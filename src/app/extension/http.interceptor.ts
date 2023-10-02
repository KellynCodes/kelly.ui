import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, take, catchError } from 'rxjs/operators';
import { selectToken } from '../modules/auth/state/auth/auth.selector';
import { AppState } from '../state/app/app.state';
import { AuthFailure } from '../modules/auth/state/auth/auth.action';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });

        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized) {
              this.authService.logout();
            }
            this.store.dispatch(AuthFailure(error));
            return next.handle(request);
          })
        );
      })
    );
  }
}
