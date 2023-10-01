import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as signUpActions from './signup.action';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app/app.state';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  SignUpRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.RegistrationRequest),
      exhaustMap((model) => {
        return this.authService.signUp(model.file).pipe(
          map((response) => {
            return signUpActions.RegistrationSuccess(response);
          }),
          catchError((error) => {
            return of(signUpActions.RegistrationFailure(error));
          }),
          finalize(() => {
            this.store.dispatch(
              signUpActions.RegistrationFailure({
                data: { IsLoading: false },
                message: null,
                statusCode: null,
              })
            );
          })
        );
      })
    )
  );
}
