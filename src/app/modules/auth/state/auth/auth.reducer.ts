import { Action, createReducer, on } from "@ngrx/store";
import { LoginSuccessDto } from "../../../../services/auth/Dto/LoginSuccessDto";
import { VerifyEmailDto } from "../../../../services/auth/Dto/verify-email.dto";
import {
    AuthFailure,
    GetUserSuccess,
    LoginSuccess,
    LogoutSuccess,
    StopLoading,
    VerifyEmailFailure,
    VerifyEmailRequest,
    VerifyEmailSuccess,
    setAuthErrorMessage,
    setAuthLoadingSpinner
} from "./auth.action";
import { authState, verifyTokenState } from "./auth.state";
import { HttpResponse } from "../../../../data/Dto/shared/http.response.dto";

const _authReducer = createReducer(
  authState,
  on(LoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      IsLoading: false,
      errorMessage: null,
      accessToken: action.accessToken,
      expiryTimeStamp: action.expiryTimeStamp,
      refreshToken: action.refreshToken
    };
  }),

  on(GetUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      errorMessage: null,
      IsLoading: false,
      accessToken: action.accessToken,
      expiryTimeStamp: action.expiryTimeStamp,
      refreshToken: action.refreshToken
    };
  }),

  on(LogoutSuccess, (state) => {
    return {
      ...state,
      user: null,
      accessToken: null,
      expiryTimeStamp:null,
      refreshToken: null
    };
  }),

  on(AuthFailure, (state, { error }) => {
    return {
      ...state,
      message: error.message,
      statusCode: error.statusCode,
      data: null
    };
  }),

  on(setAuthLoadingSpinner, (state, { IsLoading }) => {
    return {
      ...state,
      IsLoading: IsLoading,
      accessToken: null,
      expiryTimeStamp: null,
      refreshToken: null,
      user: null,
    };
  }),

  on(setAuthErrorMessage, (state, {errorMessage }) => {
    return {
      ...state,
      errorMessage: errorMessage,
      IsLoading: false,
      accessToken: null,
      expiryTimeStamp: null,
      refreshToken: null,
      user: null,
    };
  }),

);

export function authReducer(state: LoginSuccessDto | undefined, action: Action) {
  return _authReducer(state, action);
}

//Verification email state

const _verificationEmailReducer = createReducer(
  verifyTokenState,
  on(VerifyEmailRequest, (state, { model }) => {
    return {
      ...state,
      message: model.message,
      isSuccessful: model.isSuccessful,
     data: model.data
    }

  }), on(VerifyEmailSuccess, (state, { model }) => {
    return {
      ...state,
      message: model.message,
      isSuccessful: model.isSuccessful,
     data: model.data
    }
  }),

  on(VerifyEmailFailure, (state, { model}) => {
    return {
      ...state,
      message: model.message,
      isSuccessful: model.isSuccessful,
      data: {
        isLoading: false,
        email: null,
        otp: null,
      }
    }
  }),

  on(StopLoading, (state, {model}) => {
    return {
      ...state,
      message: model.message,
      isSuccessful: model.isSuccessful,
      data: model.data
    }
  })
)

export function verificationEmailReducer(state: HttpResponse<VerifyEmailDto> | undefined, action: Action) {
  return _verificationEmailReducer(state, action);
}
