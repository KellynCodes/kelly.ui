import { RouterReducerState } from '@ngrx/router-store';
import { LoginSuccessDto } from '../../services/auth/Dto/LoginSuccessDto';
import { SHARED_STATE_NAME } from '../shared/shared.selector';
import { SharedState } from '../shared/shared.state';
import { ContactState } from '../../pages/contact/state/contact.state';
import { CONTACT_STATE_NAME } from '../../pages/contact/state/contact.selector';
import { AUTH_STATE_NAME } from '../../modules/auth/state/auth/auth.selector';
import { SIGNUP_STATE_NAME } from '../../modules/auth/state/signup/signup.selector';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import {
  FILE_STATE_NAME,
  FILE_STATE_UPLOAD_NAME,
} from '../../modules/auth/state/file/file.selector';
import { UploadFileResponseDto } from '../../services/auth/Dto/UploadFileResponseDto';

export interface AppState {
  [AUTH_STATE_NAME]: LoginSuccessDto;
  [SIGNUP_STATE_NAME]: HttpResponse<{ IsLoading: boolean }>;
  [CONTACT_STATE_NAME]: ContactState;
  [FILE_STATE_NAME]: UploadFileResponseDto;
  [FILE_STATE_UPLOAD_NAME]: {
    file: FormData;
    userId: string;
    IsLoading: boolean;
  };
  [SHARED_STATE_NAME]: SharedState;
  router: RouterReducerState;
}
