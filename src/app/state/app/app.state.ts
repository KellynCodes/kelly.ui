import { RouterReducerState } from "@ngrx/router-store";
import { HttpResponse } from "../../data/Dto/auth/http.response";
import { LoginSuccessDto } from "../../services/auth/Dto/LoginSuccessDto";
import { SHARED_STATE_NAME } from "../shared/shared.selector";
import { SharedState } from "../shared/shared.state";
import { AUTH_STATE_NAME } from "../../modules/auth/state/auth.selector";
import { ContactState } from "../../pages/contact/state/contact.state";
import { CONTACT_STATE_NAME } from "../../pages/contact/state/contact.selector";

export interface AppState{
  [AUTH_STATE_NAME]: LoginSuccessDto,
  [CONTACT_STATE_NAME]: ContactState
  [SHARED_STATE_NAME]: SharedState,
  router: RouterReducerState
}
