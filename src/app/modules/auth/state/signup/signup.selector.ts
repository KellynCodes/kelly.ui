import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HttpResponse } from "../../../../data/Dto/shared/http.response.dto";

export const SIGNUP_STATE_NAME = "registration";

export const selectSignUpState = createFeatureSelector<HttpResponse<{ IsLoading: boolean }>>(SIGNUP_STATE_NAME);

export const getSignUpMessage = createSelector(selectSignUpState, (state) => state?.message);

export const getSignUpIsLoading = createSelector(selectSignUpState, (state) => state.data?.IsLoading);
