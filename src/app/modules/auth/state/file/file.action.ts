import { createAction, props } from '@ngrx/store';
import { UploadFileResponseDto } from '../../../../services/auth/Dto/UploadFileResponseDto';

export const UploadFileRequest = createAction(
  '[File] Upload user avatar',
  props<{ file: FormData; userId: string; IsLoading: boolean }>()
);

export const ResetUploadState = createAction(
  '[File] Reset user avatar state',
  props<{ file: FormData; IsLoading: boolean }>()
);

export const UploadFileSuccess = createAction(
  '[File] Upload user avatar success',
  props<UploadFileResponseDto>()
);

export const UploadImageFailure = createAction(
  '[File] Upload file error',
  props<UploadFileResponseDto>()
);
