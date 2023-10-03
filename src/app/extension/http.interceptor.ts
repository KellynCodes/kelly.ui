import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, exhaustMap, from, take } from 'rxjs';
import { selectToken } from '../modules/auth/state/auth/auth.selector';
import { AuthFailure } from '../modules/auth/state/auth/auth.action';
import { LocationService } from '../services/audit/location.service';
import { AuthService } from '../services/auth/auth.service';
import { AppState } from '../state/app/app.state';
import { Store } from '@ngrx/store';
// ... other imports ...

@Injectable({
  providedIn: 'root'
})
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private locationService: LocationService
  ) { }

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

   

        return from(this.locationService.getUserLocation()).pipe(
          exhaustMap((position: any) => {
            const browserName = this.locationService.getBrowserName;
            const userLocation = `Browser: ${browserName}  latitude:  ${position.coords.latitude};longtitude:  ${position.coords.longitude}`;
        const headers = request.headers.set('Authorization', `Bearer ${token}`)
            .set('x-user-info', userLocation)
            .set('x-geo-coordinate-longitude', position.coords.longitude)
              .set('x-geo-coordinate-latitude', position.coords.latitude)
            .set('x-device', browserName);
            console.log(headers);
            const clonedRequest = request.clone({ headers });

            return next.handle(clonedRequest).pipe(
              catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Unauthorized) {
                  this.authService.logout();
                }
                this.store.dispatch(AuthFailure(error));
                return next.handle(request);
              })
            );
          }),
          catchError(() => {
            // Handle the case where location is not available
            // You can still send the request with just the token and browser name headers
            //const clonedRequest = request.clone({ headers });
            return next.handle(request);
          })
        );
      })
    );
  }
}
