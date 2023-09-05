import { createAction, createActionGroup, props } from "@ngrx/store";
import { LoginDto } from "../../data/Dto/auth/login.dto";
import { LoginSuccessDto } from "../../services/auth/Dto/LoginSuccessDto";
import { HttpResponse } from "../../data/Dto/auth/http.response";

export const LoginRequest = createAction(
  '[User] Login Request',
  props<{ credentails: LoginDto }>(),
)

export const LoginSuccess = createAction(
  '[User] Login Success',
  props<{ loginSuccessResponse: HttpResponse<LoginSuccessDto> }>(),
)

export const LoginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>(),
)
