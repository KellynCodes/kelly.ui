import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactDto } from "../../../data/Dto/contact/contactDto";
import { HttpResponse } from "../../../data/Dto/shared/http.response.dto";

export const CONTACT_STATE_NAME = "contact";

export const selectContactState = createFeatureSelector<ContactDto>(CONTACT_STATE_NAME);
export const selectResponseState = createFeatureSelector<HttpResponse>(CONTACT_STATE_NAME);

export const selectContactDetails = createSelector(selectContactState, (state) => state);
export const selectContactResponseMessage = createSelector(selectContactState, (state) => state.message);
