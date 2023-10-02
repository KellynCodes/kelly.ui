import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpResponse } from '../../../data/Dto/shared/http.response.dto';
import { VerifyEmailDto } from '../../../services/auth/Dto/verify-email.dto';
import { AppState } from '../../../state/app/app.state';
import { VerifyEmailRequest } from '../state/auth/auth.action';
import * as verifyEmailSelector from '../state/auth/auth.selector';
import { TimeOut } from '../../../services/utils/timeout.util';

@Component({
  selector: 'kelly-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  userEmail!: string | null;
  otp: string = "";
  isNanMessage:  string | null = null;
  isLoading$ = this.store.select(verifyEmailSelector.IsVerifyEmailLoading);
  message$ = this.store.select(verifyEmailSelector.getVerifyEmailMessage);
  isSuccessful$ = this.store.select(verifyEmailSelector.isVerifySuccessful);
  verificationState$ = this.store.select(verifyEmailSelector.verifyEmailState);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }


  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email');
  }

  ngAfterViewInit(): void {
    this.initializeOTPInput();
  }

  initializeOTPInput(): void {
    const inputs = this.elRef.nativeElement.querySelectorAll('#otp > *[id]');
    inputs[0].focus();
    inputs.forEach((input: HTMLInputElement, i: number) => {
      this.renderer.listen(input, 'keydown', (event: KeyboardEvent) => {
        if (event.key !== 'Backspace' && isNaN(parseFloat(event.key))) {
          this.isNanMessage = "Enter only numbers";
          setTimeout(() => {
            this.isNanMessage = null;
          }, 1000)
          return;
        }
        if (event.key === 'Backspace') {
          input.value = '';
          this.otp = this.otp.replace(this.otp[i], '');

          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && input.value !== '') {
            return true;
          } else if (event.key.length === 1 && /[0-9]/.test(event.key)) {
            // Number keys
            input.value = event.key;
            this.otp += event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
            // Letter keys
            input.value = event.key;
            this.otp = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
        console.log(this.otp);
        return;
      });
    });
  }

  onSubmit(): void {
    const request: HttpResponse<VerifyEmailDto> = {
      message: null,
      isSuccessful: false,
      data: {
        isLoading: true,
        email: this.userEmail,
        otp: this.otp
      }
    };
    this.store.dispatch(VerifyEmailRequest({ model: request }));
  }
}
