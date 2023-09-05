import { createReducer, on } from "@ngrx/store";
import { LoginFailure, LoginSuccess } from "./auth.action";
import { authState } from "./auth.state";

const _authReducer = createReducer(
  authState,
  on(LoginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      message: loginSuccessResponse.message,
      statusCode: loginSuccessResponse.statusCode,
      data: loginSuccessResponse.data,
    };
  }),

  on(LoginFailure, (state, { error }) => {
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

