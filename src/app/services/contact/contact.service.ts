import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ContactDto } from './Dto/contactDto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  contactMe(model: ContactDto): Observable<HttpResponse> {
    debugger;
    const url: string = `${environment.apiUrl}/contact`;
    return this.http.post<HttpResponse>(url, model);
  }

  deleteContact(contactId: string): Observable<HttpResponse> {
    const url: string = `${environment.apiUrl}/contact/${contactId}`;
    return this.http.delete<HttpResponse>(url);
  }
}
