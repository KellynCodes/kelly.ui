import { routerReducer } from "@ngrx/router-store";
import { authReducer } from "../auth/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/auth.selector";
import { sharedReducer } from "../shared/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/shared.selector";

export const appReducer = {
  [AUTH_STATE_NAME]: authReducer,
  [SHARED_STATE_NAME]: sharedReducer,
  router: routerReducer
}
