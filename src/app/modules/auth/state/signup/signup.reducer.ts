import { createReducer, on } from "@ngrx/store";
import { RegistrationFailure, RegistrationSuccess } from "./signup.action";
import { signUpState } from "./signup.state";

export const _signUpReducer = createReducer(
  signUpState,
  on(RegistrationSuccess, (state, action) => {
    return {
      ...state,
      message: action.message,
      statusCode: action.statusCode,
     data: action.data
    }
  }),

  on(RegistrationFailure, (state, action) => {
    return {
      ...state,
      message: action.message,
      statusCode: action.statusCode,
      data: action.data
    }
  })
)

export function signUpReducer(state: any, action: any){
  return _signUpReducer(state, action);
}
