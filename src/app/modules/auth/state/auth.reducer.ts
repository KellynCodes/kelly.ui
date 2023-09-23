import { createReducer, on } from "@ngrx/store";
import { AuthFailure, GetUserSuccess, LoginSuccess, LogoutSuccess } from "./auth.action";
import { authState } from "./auth.state";

const _authReducer = createReducer(
  authState,
  on(LoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      accessToken: action.accessToken,
      expiryTimeStamp: action.expiryTimeStamp,
      refreshToken: action.refreshToken
    };
  }),

  on(GetUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      accessToken: action.accessToken,
      expiryTimeStamp: action.expiryTimeStamp,
      refreshToken: action.refreshToken
    };
  }),

  on(LogoutSuccess, (state, action) => {
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

);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

