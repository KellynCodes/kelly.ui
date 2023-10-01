import { UserDto } from "../../user/Dto/user.dto";

export interface LoginSuccessDto {
  accessToken: string | null;
  refreshToken: string | null;
  expiryTimeStamp: number | null;
  user: UserDto | null;
  IsLoading?: boolean;
  errorMessage?: string | null;
}
