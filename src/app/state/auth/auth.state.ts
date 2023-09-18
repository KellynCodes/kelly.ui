import { HttpResponse } from "../../data/Dto/shared/http.response.dto";
import { LoginSuccessDto } from "../../services/auth/Dto/LoginSuccessDto";

export const authState: HttpResponse<LoginSuccessDto> = {
  message: null,
  statusCode: null,
  data: null
};
