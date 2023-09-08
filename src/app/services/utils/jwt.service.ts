import { Inject, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { localStorageToken } from '../../extension/local.storage';
import { UserDto } from '../../data/Dto/user/user.dto';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(@Inject(localStorageToken) private localStorage: Storage) {}
  token: string | null = this.localStorage.getItem('token');
  user: any | null = this.localStorage.getItem('user');

 public get getToken(): { IsSuccessful: boolean; token: string | null } {
    if (this.token == null) {
      return { IsSuccessful: false, token: null };
    }
    return { IsSuccessful: true, token: this.token };
  }

  public get getUser(): { IsSuccessful: boolean; user: UserDto | null } {
    if (this.user == null) {
      return { IsSuccessful: false, user: null };
    }
    const user: UserDto = JSON.parse(this.user);
    return { IsSuccessful: true, user: user };
  }

  public decodeJwtToken(accessToken: string): { IsSuccessful: boolean; data: any } {
    try {
      if (accessToken == "" || accessToken == null) {
        return { IsSuccessful: false, data: null };
      }
      this.localStorage.setItem("token", accessToken);
      const decodedToken: UserDto = jwt_decode(accessToken);
      const user: string = JSON.stringify(decodedToken);
      this.localStorage.setItem("user", user);
      return { IsSuccessful: true, data: decodedToken };
    } catch (error) {
      return { IsSuccessful: false, data: null };
    }
  }
}
