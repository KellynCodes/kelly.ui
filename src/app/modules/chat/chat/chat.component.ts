import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../../services/signalr/signalr.service';
import { ChatDto } from '../../../models/chat';

@Component({
  selector: 'kelly-chat',
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
    const chat: ChatDto = { userId: "be314293-a542-43dd-89c5-9c2286b59e18", username:"Kelly", message: this.chatForm.value.message };
    this.signalRService.sendMessage(chat);
    this.IsTyping = false;
    this.chatForm.reset();
  }

}
