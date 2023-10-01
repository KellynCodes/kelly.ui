import { UploadFileResponseDto } from '../../../../services/auth/Dto/UploadFileResponseDto';

export const fileState: UploadFileResponseDto = {
  isSuccessful: false,

  message: null,

  s3Path: null,

  fileUrl: null,
};
