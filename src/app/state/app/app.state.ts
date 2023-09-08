import { RouterReducerState } from "@ngrx/router-store";
import { HttpResponse } from "../../data/Dto/auth/http.response";
import { LoginSuccessDto } from "../../services/auth/Dto/LoginSuccessDto";
import { AUTH_STATE_NAME } from "../auth/auth.selector";
import { SHARED_STATE_NAME } from "../shared/shared.selector";
import { SharedState } from "../shared/shared.state";

export interface AppState{
  [AUTH_STATE_NAME]: HttpResponse<LoginSuccessDto>,
  [SHARED_STATE_NAME]: SharedState,
  router: RouterReducerState
}
