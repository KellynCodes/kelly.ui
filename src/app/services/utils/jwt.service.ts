import { Inject, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { localStorageToken } from '../../extension/local.storage';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(@Inject(localStorageToken) private localStorage: Storage) {}
  token: string | null = this.localStorage.getItem('token');

  get getToken(): { IsSuccessful: boolean; token: string | null } {
    if (this.token == null) {
      return { IsSuccessful: false, token: null };
    }
    return { IsSuccessful: true, token: this.token };
  }

  decodeJwtToken(): { IsSuccessful: boolean; data: any } {
    try {
      if (this.token == null) {
        return { IsSuccessful: false, data: null };
      }
      const decodedToken = jwt_decode(this.token);
      return { IsSuccessful: true, data: decodedToken };
    } catch (error) {
      return { IsSuccessful: false, data: null };
    }
  }
}
