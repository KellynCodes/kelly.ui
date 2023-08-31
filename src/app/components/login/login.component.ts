import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpResponse } from '../../data/Dto/http.response.dto';

@Component({
  selector: 'hms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  error!: HttpResponse | null;
  IsFetching!: boolean;
  hidePassword!: boolean;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.error = null;
    }, timeOut);
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.error = {
        message: 'Fill the required fields',
        statusCode: 400,
        data: null,
      };
      this.setTimeOut(3000);
      return;
    }
    this.IsFetching = true;
    this.authService.Login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.data !== null) {
          const IsSaved: boolean = this.authService.saveUserSession(response);
          if (IsSaved) {
            this.IsFetching = false;
            window.location.assign('');
          }
        }
      },
      error: (err) => {
        this.error = err.error.message;
        this.IsFetching = false;
        this.setTimeOut();
      },
    });
  }
}
