import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import * as ContactActions from './contact.action';
import { catchError, exhaustMap, finalize, map, of, pipe, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContactService } from '../../../services/contact/contact.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../../state/shared/shared.action';

@Injectable()
export class ContactEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private contactService: ContactService
  ) {}

  contactMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.ContactRequest),
      exhaustMap((model) =>
        this.contactService.contactMe(model).pipe(
          map((contactSuccessResponse) => {
            return ContactActions.ContactResponse({
              res: contactSuccessResponse,
            });
          }),
          catchError((error) => {
            return of(
              setErrorMessage({
                message:
                  'Sorry! unexpected request failure, please try again with valid details.',
              })
            );
          }),
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ IsLoading: false }));
            setTimeout(() => {
              this.store.dispatch(setErrorMessage({ message: null }));
              this.store.dispatch(
                ContactActions.ContactResponse({
                  res: { message: null, isSuccessful: false, data: null },
                })
              );
            }, 3000);
          })
        )
      )
    )
  );
}
