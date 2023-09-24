import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../../services/signalr/signalr.service';
import { ChatDto } from '../../../models/chat';
import { UserDto } from '../../../data/Dto/user/user.dto';
import { JwtService } from '../../../services/utils/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'kelly-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public chats: Array<ChatDto> = [];
  public chatForm: FormGroup;
  public message!: string;
  public IsTyping: boolean = false;
  public userName = this.jwtService.getUser()?.unique_name[0]!;


  constructor(
    private signalRService: SignalRService,
    private jwtService: JwtService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
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
    const chat: ChatDto = {
      userId: this.jwtService.getUser().userId!,
      username: this.userName!,
      message: this.chatForm.value.message
    };
    this.signalRService.sendMessage(chat);
    this.IsTyping = false;
    this.chatForm.reset();
  }

  public logout(): void {
    const IsloggedOut: boolean = this.authService.logout();
    if (IsloggedOut) {
      this.router.navigateByUrl("/");
    }
  }

}
