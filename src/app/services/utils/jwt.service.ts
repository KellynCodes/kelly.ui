import { Inject, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserDto } from '../../data/Dto/user/user.dto';
import { localStorageToken } from '../../extension/local.storage';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { GetUserSuccess, LoginSuccess } from '../../modules/auth/state/auth.action';
import { LoginSuccessDto } from '../auth/Dto/LoginSuccessDto';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private store: Store<AppState>
  ) { }
  private user: any | null = this.localStorage.getItem('authUser');

  public get getUser(): UserDto {
    const authUser: LoginSuccessDto = JSON.parse(this.user);
    return authUser?.user!;
  }

  public get CheckUser(): UserDto {
    const authUser: LoginSuccessDto = JSON.parse(this.user);
    this.store.dispatch(GetUserSuccess(authUser))
    return authUser?.user!;
  }

  public decodeJwtToken(
    loginSuccess: LoginSuccessDto): UserDto | null {
    try {
      const decodedToken: UserDto = jwt_decode(loginSuccess.accessToken!);
      const userSession: LoginSuccessDto = {
        accessToken: loginSuccess.accessToken,
        refreshToken: loginSuccess.refreshToken,
        expiryTimeStamp: loginSuccess.expiryTimeStamp,
        user: decodedToken
      }
      const authUser: string = JSON.stringify(userSession);
      this.localStorage.setItem("authUser", authUser);
      return decodedToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
