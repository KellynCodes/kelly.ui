export interface VerifyEmailDto {
  otp?: string | null;
  email?: string | null;
  isLoading?: boolean;
}
