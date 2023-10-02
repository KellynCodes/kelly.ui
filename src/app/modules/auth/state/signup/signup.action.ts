import { createAction, props } from '@ngrx/store';
import { HttpResponse } from '../../../../data/Dto/shared/http.response.dto';

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
  props<{error: any }>()
);


export const RegistrationFired = createAction(
  '[SignUp] Request Fired',
  props<HttpResponse<{ IsLoading: boolean }>>()
);
