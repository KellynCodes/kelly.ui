import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { ChatDto } from '../../models/chat';
import { environment } from '../../../environment/environment';
import { HttpResponse } from '../../data/Dto/shared/http.response.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChats(): Observable<HttpResponse<ChatDto>> {
    const url: string = `${environment.apiUrl}/chat`;
    return this.http.get<HttpResponse<ChatDto>>(url);
  }
}
