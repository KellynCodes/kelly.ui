import { HttpResponse } from "../../../../data/Dto/shared/http.response.dto";

export const signUpState: HttpResponse<{ IsLoading: boolean }> = {
  message: null,
  isSuccessful: false,
  data: { IsLoading: false },
}
