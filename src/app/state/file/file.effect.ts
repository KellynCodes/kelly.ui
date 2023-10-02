import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import * as FileActions from './file.action';
import { localStorageToken } from '../../extension/local.storage';
import { FileService } from '../../services/file/file.service';
import { AppState } from '../app/app.state';

@Injectable()
export class FileEffect {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private actions$: Actions,
    private fileService: FileService,
    private store: Store<AppState>
  ) {}

  UploadFileRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.UploadFileRequest),
      exhaustMap((model) =>
        this.fileService.postFile(model.file, model.userId).pipe(
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

}
