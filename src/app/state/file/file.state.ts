import { UploadFileResponseDto } from "../../services/file/Dto/UploadFileResponseDto";

export const fileState: UploadFileResponseDto = {
  isSuccessful: false,

  message: null,

  s3Path: null,

  fileUrl: null,
};
