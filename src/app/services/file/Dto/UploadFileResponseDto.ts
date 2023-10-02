export interface UploadFileResponseDto {
  isSuccessful: boolean;

  message: string | null;

  s3Path: string | null;

  fileUrl: string | null;

}
