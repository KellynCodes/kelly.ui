import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TimeOut {
  
public setTimeOut(timeOut: number = 2000, object: any): void {
  setTimeout(() => {
  object = null;
}, timeOut);
  }
}
