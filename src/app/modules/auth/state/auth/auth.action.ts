import { VerifyEmailDto } from './../../../../services/auth/Dto/verify-email.dto';
import { createAction, props } from '@ngrx/store';
import { LoginSuccessDto } from '../../../../services/auth/Dto/LoginSuccessDto';
import { LoginDto } from '../../../../services/auth/Dto/login.dto';
import { HttpResponse } from '../../../../data/Dto/shared/http.response.dto';

//login actions
export const LoginRequest = createAction(
  '[Auth] Login Request',
  props<{ model: LoginDto }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<LoginSuccessDto>()
);

export const GetUserSuccess = createAction(
  '[Auth] Get User Success',
  props<LoginSuccessDto>()
);

export const AuthFailure = createAction(
  '[Auth] auth failure',
  props<{ error: any }>()
);

export const setAuthLoadingSpinner = createAction(
  '[Auth] set loading spinner',
  props<LoginSuccessDto>()
);

export const setAuthErrorMessage = createAction(
  '[Auth] set error message',
  props<LoginSuccessDto>()
);

export const LogoutSuccess = createAction('[Auth] Logout User');

//verify email actions
export const VerifyEmailRequest = createAction(
  '[Email] Verification',
  props<{ model: HttpResponse<VerifyEmailDto> }>()
);

export const VerifyEmailSuccess = createAction(
  '[Email] Verification Success',
  props<{ model: HttpResponse<VerifyEmailDto> }>()
);

export const StopLoading = createAction(
  '[Email] Stop Loading',
  props<{ model: HttpResponse<VerifyEmailDto> }>()
);

export const VerifyEmailFailure = createAction(
  '[Email] Verification Failure',
  props<{ model: HttpResponse<VerifyEmailDto> }>()
);
