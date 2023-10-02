import { createReducer, on } from "@ngrx/store"
import { contactState } from "./contact.state"
import { ContactResponse } from "./contact.action"

const _contactReducer = createReducer(
  contactState,
  on(ContactResponse, (state, { res }) => {
    return {
      ...state,
      message: res.message,
      isSuccessful: res.isSuccessful,
      data: res.data
    }
  })
)

export function contactReducer(state: any, action: any) {
  return _contactReducer(state, action);
}

