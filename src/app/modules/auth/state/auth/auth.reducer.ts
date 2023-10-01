import { createReducer, on } from "@ngrx/store";
import {
  AuthFailure,
  GetUserSuccess,
  LoginSuccess,
  LogoutSuccess,
  setAuthErrorMessage,
  setAuthLoadingSpinner
} from "./auth.action";
import { authState } from "./auth.state";

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

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

