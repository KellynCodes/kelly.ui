import { HttpResponse } from '../../../data/Dto/shared/http.response.dto';

export interface ContactState {
  name: string | null;
  email: string | null;
  message: string | null;
}

export const contactState: HttpResponse<ContactState> = {
  message: null,
  isSuccessful: false,
  data: null,
};
