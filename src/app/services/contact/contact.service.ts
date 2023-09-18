import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactDto } from '../../data/Dto/shared/contact.dto';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

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
