import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { JwtService } from '../../../../services/utils/jwt.service';
import { AppState } from '../../../../state/app/app.state';
import * as AuthActions from './auth.action';
import * as verificationActions from "./auth.action";
import { setAuthErrorMessage } from './auth.action';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  // Auth request
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginRequest),
      exhaustMap((action) =>
        this.authService.Login(action.model).pipe(
          map((res) => {
            const user = this.jwtService.decodeJwtToken(res.data!);
            return AuthActions.LoginSuccess(res.data!);
          }),
          catchError((error) => {
            return of(AuthActions.AuthFailure({ error: error.error }));
          })
        )
      )
    )
  );

  //Auth request success
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LoginSuccess),
        map((data) => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  // Auth request failures
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthFailure),
        tap(({ error }) => {
          this.store.dispatch(
            setAuthErrorMessage({
              IsLoading: false,
              errorMessage: error.message,
              expiryTimeStamp: null,
              accessToken: null,
              refreshToken: null,
              user: null,
            })
          );
          setTimeout(() => {
            this.store.dispatch(
              setAuthErrorMessage({
                IsLoading: false,
                errorMessage: null,
                expiryTimeStamp: null,
                accessToken: null,
                refreshToken: null,
                user: null,
              })
            );
          }, 5000);
        })
      ),
    { dispatch: false }
  );

//End of login effects


//verify-email effects


  verifyEmailEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(verificationActions.VerifyEmailRequest),
    exhaustMap((action) =>
      this.authService.verifyEmail(action.model.data!).pipe(
        map((res) => {
          return verificationActions.VerifyEmailSuccess({model: res!});
        }),
        catchError((error) => {
          return of(verificationActions.VerifyEmailFailure({model: error.error}));
        }),
        finalize(() => {
          setTimeout(() => {
            this.store.dispatch(
              verificationActions.StopLoading({
                model: {
                  message: null,
                  isSuccessful: false,
                  data: null
                }
              })
            );
          }, 3000);
        })
      )
    )
  )
  );

  VerificationSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(verificationActions.VerifyEmailSuccess),
        map((data) => {
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 3500)
        })
      ),
    { dispatch: false }
  );

}
