import { routerReducer } from "@ngrx/router-store";
import { sharedReducer } from "../shared/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/shared.selector";
import { AUTH_STATE_NAME } from "../../modules/auth/state/auth.selector";
import { authReducer } from "../../modules/auth/state/auth.reducer";
import { CONTACT_STATE_NAME } from "../../pages/contact/state/contact.selector";
import { contactReducer } from "../../pages/contact/state/contact.reducer";

export const appReducer = {
  [AUTH_STATE_NAME]: authReducer,
  [SHARED_STATE_NAME]: sharedReducer,
  [CONTACT_STATE_NAME]: contactReducer,
  router: routerReducer
}
