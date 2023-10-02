import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UploadFileResponseDto } from '../../services/file/Dto/UploadFileResponseDto';

export const FILE_STATE_NAME = 'file';
export const FILE_STATE_UPLOAD_NAME = 'file-upload';

export const selectFileUploadState =
  createFeatureSelector<UploadFileResponseDto>(FILE_STATE_NAME);
export const selectFileUploadRequestState = createFeatureSelector<{
  file: FormData;
  IsLoading: boolean;
}>(FILE_STATE_UPLOAD_NAME);

export const getFileUploadErrorMessage = createSelector(
  selectFileUploadState,
  (state) => state?.message
);

export const getFileUrl = createSelector(
  selectFileUploadState,
  (state) => state?.fileUrl
);

export const IsUploading = createSelector(
  selectFileUploadRequestState,
  (state) => state?.IsLoading
);

export const IsUploaded = createSelector(
  selectFileUploadState,
  (state) => state?.isSuccessful
);
