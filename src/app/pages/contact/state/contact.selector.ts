import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HttpResponse } from "../../../data/Dto/shared/http.response.dto";
import { ContactDto } from "../../../services/contact/Dto/contactDto";

export const CONTACT_STATE_NAME = "contact";

export const selectContactState = createFeatureSelector<ContactDto>(CONTACT_STATE_NAME);
export const selectResponseState = createFeatureSelector<HttpResponse>(CONTACT_STATE_NAME);

export const selectContactDetails = createSelector(selectContactState, (state) => state);
export const selectContactResponseMessage = createSelector(selectContactState, (state) => state.message);
