import { LoginSuccessDto } from "../../../services/auth/Dto/LoginSuccessDto";

export const authState: LoginSuccessDto = {
  accessToken: null,
  expiryTimeStamp: null,
  refreshToken: null,
  user: null
};
