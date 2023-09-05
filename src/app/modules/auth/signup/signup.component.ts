import { Component, Inject } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageToken } from '../../../extension/local.storage';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpResponse } from '../../../data/Dto/http.response.dto';

@Component({
  selector: 'kelly-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  IsRememberMe: boolean = false;
  error!: HttpResponse | null;
  IsFetching!: boolean;
  UserImgPath!: string;
  errorMessage!: any;
  successMessage!: any;
  uploadingImage!: boolean;
  uploaded!: boolean;
  hidePassword!: boolean;
  uploadError!: string;
  regForm!: FormGroup;

  constructor(
    private authService: AuthService,
    @Inject(localStorageToken) private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
      this.error = null;
    }, timeOut);
  }
  getControl(name: string): AbstractControl | null {
    return this.regForm.get(name);
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    return this.regForm.get(controlName)?.hasError(errorName);
  }

  toggleChoice(): void {
    this.IsRememberMe = !this.IsRememberMe;
  }

  onFileSelect(event: any): void {
    if (event.target.files.length <= 0) {
      return;
    }
    const image: File = event.target.files[0];
    this.uploadFile(image);
    this.UserImgPath = this.localStorage.getItem('UserImgPath')!;
  }

  uploadFile(file: File) {
    this.uploadingImage = true;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.authService.postImage(formData).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.localStorage.removeItem('UserImgPath');
          this.localStorage.setItem('UserImgPath', res.data!.ImgPath);
          this.uploaded = true;
          this.uploadingImage = false;
          this.successMessage = `${res.message}`;
        } else {
          this.uploaded = false;
          this.uploadingImage = false;
          this.uploadError = `${res.message}`;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message.message;
        this.uploadingImage = false;
        this.uploaded = false;
        this.uploadError = err.error.message.message;
      },
    });
  }

  onSubmit(): void {
    if (!this.regForm.valid) {
      this.errorMessage = 'Fill all the required field.';
      this.setTimeOut(3000);
      return;
    }
    this.IsFetching = true;
    this.regForm.value.profileURL = this.localStorage.getItem('UserImgPath')!;
    this.regForm.value.role = 'user';
    this.authService.signUp(this.regForm.value).subscribe({
      next: (response) => {
        if (response.data !== null) {
          this.IsFetching = false;
          this.router.navigate(['/login']);
        }
        this.IsFetching = false;
        this.errorMessage = 'Sorry something unexpected happened!.';
      },
      error: (err) => {
        this.error = err.error.message;
        this.IsFetching = false;
        this.setTimeOut(3000);
      },
    });
  }
}
