import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as signUpActions from './signup.action';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app/app.state';
import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class SignUpEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
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
            setTimeout(() => {
              this.store.dispatch(signUpActions.RegistrationFired(
                {
                  message: null,
                  isSuccessful: false,
                  data: { IsLoading: false }
                }))
            }, 5000);
          })
        );
      })
    )
  );

  SignUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.RegistrationSuccess),
      map((data => {
        if (data.isSuccessful) {
          setTimeout(() => {
            this.router.navigateByUrl("/auth/login");
          }, 3000);
        }
      }))
    ), { dispatch: false })

}
