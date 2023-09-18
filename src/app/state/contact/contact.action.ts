import { createAction, props } from "@ngrx/store";
import { HttpResponse } from "../../data/Dto/shared/http.response.dto";
import { ContactDto } from "../../data/Dto/contact/contactDto";


export const ContactRequest = createAction(
    '[Contact] Contact Me',
    props<ContactDto>(),
  )

export const ContactResponse = createAction(
  '[Contact] Contact Success',
  props<{ res: HttpResponse }>(),
);


export const DeleteContact = createAction(
  '[Contact] Delete Contact',
  props<{ contactId: string }>(),
);
