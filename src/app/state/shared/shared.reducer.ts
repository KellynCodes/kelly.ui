import { createReducer, on } from "@ngrx/store";
import { setErrorMessage, setIsMobile, setLoadingSpinner, setSuccessMessage } from "./shared.action";
import { sharedState } from "./shared.state";

const _sharedReducer = createReducer(sharedState,
  on(setLoadingSpinner, (state, { IsLoading }) => {
    return {
      ...state,
      IsLoading: IsLoading
    };
  }),

  on(setErrorMessage, (state, {message }) => {
    return {
      ...state,
      errorMessage: message
    };
  }),

  on(setSuccessMessage, (state, { message }) => {
    return {
      ...state,
      successMessage: message,
    };
  }),

  on(setIsMobile, (state, {IsMobile }) => {
    return {
      ...state,
      IsMobile: IsMobile
    }
  })
)

export function sharedReducer(state: any, action: any) {
 return _sharedReducer(state, action);
}
