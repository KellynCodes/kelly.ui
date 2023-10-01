import { createAction, props } from '@ngrx/store';
import { HttpResponse } from '../../../../data/Dto/shared/http.response.dto';
import { SignUpDto } from '../../../../services/auth/Dto/signup.dto';

export const RegistrationRequest = createAction(
  '[SignUp] Request',
  props<{ file: FormData }>()
);

export const RegistrationSuccess = createAction(
  '[SignUp] Request Success',
  props<HttpResponse>()
);

export const RegistrationFailure = createAction(
  '[SignUp] Request Failure',
  props<HttpResponse<{ IsLoading: boolean }>>()
);
