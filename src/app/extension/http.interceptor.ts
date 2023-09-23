import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app/app.state';
import { exhaustMap, map, tap } from 'rxjs';
import { selectToken } from '../modules/auth/state/auth.selector';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
 
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        const clonedRequest = request.clone({
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        });

        return next.handle(clonedRequest);
      })
    )
  }
}
