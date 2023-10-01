import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { localStorageToken } from '../../../../extension/local.storage';
import { AuthService } from '../../../../services/auth/auth.service';
import { AppState } from '../../../../state/app/app.state';
import * as FileActions from './file.action';

@Injectable()
export class FileEffect {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  UploadFileRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.UploadFileRequest),
      exhaustMap((model) =>
        this.authService.postFile(model.file, model.userId).pipe(
          map((res) => {
            return FileActions.UploadFileSuccess(res);
          }),
          catchError((error) => {
            return of(FileActions.UploadImageFailure(error));
          }),
          finalize(() => {
            this.store.dispatch(
              FileActions.ResetUploadState({ file: null!, IsLoading: false })
            );
          })
        )
      )
    )
  );

  UploadImageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileActions.UploadFileSuccess),
        map((data) => {
          this.localStorage.removeItem('avatarUrl');
          this.localStorage.setItem('avatarUrl', data.fileUrl!);
        })
      ),
    { dispatch: false }
  );
}
