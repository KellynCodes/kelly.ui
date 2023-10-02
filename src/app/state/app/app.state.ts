import { RouterReducerState } from '@ngrx/router-store';
import { LoginSuccessDto } from '../../services/auth/Dto/LoginSuccessDto';
import { SHARED_STATE_NAME } from '../shared/shared.selector';
import { SharedState } from '../shared/shared.state';
import { ContactState } from '../../pages/contact/state/contact.state';
import { CONTACT_STATE_NAME } from '../../pages/contact/state/contact.selector';
import { AUTH_STATE_NAME, VERIFY_EMAIL_STATE_NAME } from '../../modules/auth/state/auth/auth.selector';
import { SIGNUP_STATE_NAME } from '../../modules/auth/state/signup/signup.selector';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import { UploadFileResponseDto } from '../../services/file/Dto/UploadFileResponseDto';
import { VerifyEmailDto } from '../../services/auth/Dto/verify-email.dto';
import { FILE_STATE_NAME, FILE_STATE_UPLOAD_NAME } from '../file/file.selector';

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
  [VERIFY_EMAIL_STATE_NAME]: HttpResponse<VerifyEmailDto>,
  [SHARED_STATE_NAME]: SharedState;
  router: RouterReducerState;
}
