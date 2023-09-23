import { createAction, createActionGroup, props } from "@ngrx/store";
import { LoginDto } from "../../../data/Dto/auth/login.dto";
import { LoginSuccessDto } from "../../../services/auth/Dto/LoginSuccessDto";

export const LoginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentails: LoginDto }>(),
)

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<LoginSuccessDto>(),
);


export const GetUserSuccess = createAction(
  '[Auth] Get User Success',
  props<LoginSuccessDto>(),
);

export const AuthFailure = createAction(
  '[Auth] auth failure',
  props<{ error: any }>(),
);

export const LogoutSuccess = createAction('[Auth] logout success');
