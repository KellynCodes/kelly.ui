import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "../../../services/auth/auth.service";
import { AppState } from "../../../state/app/app.state";
import { JwtService } from "../../../services/utils/jwt.service";
import { setErrorMessage, setLoadingSpinner } from "../../../state/shared/shared.action";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService) { }

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
      finalize(() => {
        this.store.dispatch(setLoadingSpinner({ IsLoading: false }));
      })
      ),
    )));


  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.LoginSuccess),
      map((data => {
        this.router.navigateByUrl("/");
    }))
    ), {dispatch: false})


  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthFailure),
      tap(((({ error }) => {
        this.store.dispatch(setErrorMessage({message: error.message}));
        setTimeout(() => {
          this.store.dispatch(setErrorMessage({message: null}));
          this.store.dispatch(setLoadingSpinner({IsLoading: false}));
        }, 3000)
      })))
    ), { dispatch: false })
}
