import { VerifyEmailDto } from './../../../../services/auth/Dto/verify-email.dto';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginSuccessDto } from '../../../../services/auth/Dto/LoginSuccessDto';
import { HttpResponse } from '../../../../data/Dto/shared/http.response.dto';

export const AUTH_STATE_NAME = 'auth';
export const VERIFY_EMAIL_STATE_NAME = 'verify-email';

//login selectors
export const selectAuthState =
  createFeatureSelector<LoginSuccessDto>(AUTH_STATE_NAME);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const getLoading = createSelector(
  selectAuthState,
  (state) => state?.IsLoading
);

export const getErrorMessage = createSelector(
  selectAuthState,
  (state) => state?.errorMessage
);

//verify email selectors
export const verifyEmailState = createFeatureSelector<HttpResponse<VerifyEmailDto>>(
  VERIFY_EMAIL_STATE_NAME
);

export const getVerifyEmailMessage = createSelector(
  verifyEmailState,
  (state) => state?.message
);
export const isVerifySuccessful = createSelector(
  verifyEmailState,
  (state) => state?.isSuccessful
);

export const VerifyState = createSelector(
  verifyEmailState,
  (state) => state
);
export const IsVerifyEmailLoading = createSelector(
  verifyEmailState,
  (state) => state.data?.isLoading
);
