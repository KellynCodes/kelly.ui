import { createReducer, on } from "@ngrx/store"
import { contactState } from "./contact.state"
import { ContactResponse } from "./contact.action"

export const _contactReducer = createReducer(
  contactState,
  on(ContactResponse, (state, action) => {
    return {
      ...state,
      message: action.message,
      statusCode: action.statusCode,
      data: action.data
    }
  })
)
