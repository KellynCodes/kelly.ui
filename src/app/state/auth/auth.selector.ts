import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HttpResponse } from "../../data/Dto/shared/http.response.dto";
import { LoginSuccessDto } from "../../services/auth/Dto/LoginSuccessDto";

export const AUTH_STATE_NAME = "auth";

export const selectAuthState = createFeatureSelector<HttpResponse<LoginSuccessDto>>(AUTH_STATE_NAME);

export const selectToken = createSelector(selectAuthState, (state) => state.data?.accessToken);

export const selectUser = createSelector(selectAuthState, (state) => state.data?.user);
