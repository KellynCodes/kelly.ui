import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginSuccessDto } from "../../../../services/auth/Dto/LoginSuccessDto";

export const AUTH_STATE_NAME = "auth";

export const selectAuthState = createFeatureSelector<LoginSuccessDto>(AUTH_STATE_NAME);

export const selectToken = createSelector(selectAuthState, (state) => state.accessToken);

export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const getLoading = createSelector(selectAuthState, (state) => state?.IsLoading);

export const getErrorMessage = createSelector(selectAuthState, (state) => state?.errorMessage);
