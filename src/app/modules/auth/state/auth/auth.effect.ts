import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth/auth.service";
import { AppState } from "../../../../state/app/app.state";
import { JwtService } from "../../../../services/utils/jwt.service";
import { setAuthErrorMessage } from "./auth.action";

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService) { }

    // Auth request
  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginRequest),
    exhaustMap((action) =>
      this.authService.Login(action.credentails).pipe(
        map((res) => {
          const user = this.jwtService.decodeJwtToken(res.data!);
          return AuthActions.LoginSuccess(res.data!);
        }
        ),
        catchError((error) => {
          return of(AuthActions.AuthFailure({ error: error.error }));
          }
        ),
      ),
    )));


  //Auth request success
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.LoginSuccess),
      map((data => {
        this.router.navigateByUrl("/");
    }))
    ), { dispatch: false})

  // Auth request failures
  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthFailure),
      tap(((({ error }) => {
        this.store.dispatch(setAuthErrorMessage({
          IsLoading: false,
          errorMessage: error.message,
          expiryTimeStamp: null,
          accessToken: null,
          refreshToken: null,
          user: null
        }));
        setTimeout(() => {
          this.store.dispatch(setAuthErrorMessage({
            IsLoading: false,
            errorMessage: null,
            expiryTimeStamp: null,
            accessToken: null,
            refreshToken: null,
            user: null
          }));
        }, 5000)
      })))
    ), { dispatch: false })

}
