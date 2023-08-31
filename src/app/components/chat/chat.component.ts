import { Component } from '@angular/core';
import { SignalRService } from '../../services/signalr/signalr.service';
import { ChatDto } from '../../models/chat';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public chats: Array<ChatDto> = [];
  chatForm: FormGroup;
  message!: string;
  IsTyping: boolean = false;

  constructor(public signalRService: SignalRService, private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      message: new FormControl('', [ Validators.required, ]),
    });

  }

  ngOnInit() {
    this.signalRService.addReceiveMessageListener((chat: ChatDto) => {
      this.chats.push(chat);
    });
    this.chatForm.get('message')?.valueChanges.subscribe(value => {
      this.IsTyping = true;
    });
  }

  sendMessage() {
    const chat: ChatDto = { userId: "abeca400-91ef-4493-8b4e-09adc1b9a161", username:"Kelly", message: this.chatForm.value.message };
    this.signalRService.sendMessage(chat);
    this.IsTyping = false;
    this.chatForm.reset();
  }

}
