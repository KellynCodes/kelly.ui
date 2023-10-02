import { HttpResponse } from '../../../../data/Dto/shared/http.response.dto';
import { LoginSuccessDto } from '../../../../services/auth/Dto/LoginSuccessDto';
import { VerifyEmailDto } from './../../../../services/auth/Dto/verify-email.dto';

export const authState: LoginSuccessDto = {
  accessToken: null,
  expiryTimeStamp: null,
  refreshToken: null,
  user: null,
  IsLoading: false,
  errorMessage: null,
};

export const verifyTokenState: HttpResponse<VerifyEmailDto> = {
  message: null,
  isSuccessful: false,
  data: null
};
