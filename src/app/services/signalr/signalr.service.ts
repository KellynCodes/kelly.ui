import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatDto } from '../../models/chat';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log(`Error while starting connection: ${err}`));
  }

  public addReceiveMessageListener = (callback: any) => {
    this.hubConnection.on('ReceiveMessage', (chat: ChatDto) => {
      callback(chat);
    });
  }

  public async sendMessage(chat: ChatDto) {
    await this.hubConnection.invoke('SendMessageAsync', chat).catch(err => console.error(err));
  }
}
