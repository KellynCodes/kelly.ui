import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }

  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('User did not permit location access.');
      }
    });
  }

  get getBrowserName(): string {
    const userAgent = window.navigator.userAgent;

    if (/Opera|OPR\//.test(userAgent)) {
      return 'Opera';
    } else if (/Edge\//.test(userAgent)) {
      return 'Edge';
    } else if (/Chrome\//.test(userAgent)) {
      return 'Chrome';
    } else if (/Safari\//.test(userAgent)) {
      return 'Safari';
    } else if (/Firefox\//.test(userAgent)) {
      return 'Firefox';
    } else if (/MSIE|Trident\//.test(userAgent)) {
      return 'Internet Explorer';
    } else {
      return 'Unknown';
    }
  }
}
