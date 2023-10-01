import { createAction, createActionGroup, props } from "@ngrx/store";
import { LoginSuccessDto } from "../../../../services/auth/Dto/LoginSuccessDto";
import { LoginDto } from "../../../../services/auth/Dto/login.dto";


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

export const setAuthLoadingSpinner = createAction(
  "[Auth] set loading spinner",
  props<LoginSuccessDto>()
)

export const setAuthErrorMessage = createAction(
  "[Auth] set error message",
  props<LoginSuccessDto>()
)

export const LogoutSuccess = createAction('[Auth] Logout User');
