import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth/auth.service";
import * as AuthActions from "./auth.action";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { JwtService } from "../../services/utils/jwt.service";
import { UserDto } from "../../data/Dto/user/user.dto";
import { Injectable } from "@angular/core";
import { setErrorMessage, setLoadingSpinner } from "../shared/shared.action";
import { AppState } from "../app/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private jwtService: JwtService) { }

  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginRequest),
    exhaustMap((action) =>
      this.authService.Login(action.credentails).pipe(
        map((loginSuccessResponse) => {
          const user: { IsSuccessful: boolean, data: UserDto } = this.jwtService.decodeJwtToken(loginSuccessResponse.data?.accessToken!);
          loginSuccessResponse.data!.user = user.data;
          return AuthActions.LoginSuccess({ loginSuccessResponse })
        }
        ),
        catchError((error) => {
          return of(AuthActions.LoginFailure({ error: error.error }));
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
      tap((({ loginSuccessResponse }) => {
        this.jwtService.decodeJwtToken(loginSuccessResponse.data?.accessToken!);
        location.assign('/');
    }))
    ), {dispatch: false})

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginFailure),
      tap(((({ error }) => {
        this.store.dispatch(setErrorMessage({message: error.message}));
        setTimeout(() => {
          this.store.dispatch(setErrorMessage({message: null}));
        }, 3000)
      })))
    ), { dispatch: false })
}
