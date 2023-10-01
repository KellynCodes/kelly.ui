import { SignUpDto } from '../../../services/auth/Dto/signup.dto';
import { Component, HostListener, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Role } from '../../../data/enum/role';
import { localStorageToken } from '../../../extension/local.storage';
import { AuthService } from '../../../services/auth/auth.service';
import { AppState } from '../../../state/app/app.state';
import * as selectFileUploadStates from '../state/file/file.selector';
import * as selectSignUpStates from '../state/signup/signup.selector';
import * as signUpActions from '../state/signup/signup.action';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'kelly-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  IsRememberMe: boolean = false;
  userImgPath!: string;
  imagePreviewLink: string | null = null;
  file!: File;
  croppedFile!: Blob;
  imageChangedEvent!: Event;
  hidePassword!: boolean;
  hasUnsavedChanges!: boolean;
  regForm!: FormGroup;

  // file upload
  uploadMessage$ = this.store.select(
    selectFileUploadStates.getFileUploadErrorMessage
  );
  isUploading$ = this.store.select(selectFileUploadStates.IsUploading);
  isUploaded$ = this.store.select(selectFileUploadStates.IsUploaded);

  // signup
  isSigningUp$ = this.store.select(selectSignUpStates.getSignUpIsLoading);
  signUpMessage$ = this.store.select(selectSignUpStates.getSignUpMessage);

  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup(
      {
        UserName: new FormControl('', Validators.required),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.authService.mustMatch('Password', 'confirmPassword') }
    );
  }

  ngOnDestroy(): void {
    if (this.regForm.touched) {
      this.hasUnsavedChanges = true;
    } else {
      this.hasUnsavedChanges = false;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    confirm('You have unsaved changes! Are you sure you want to leave?');
    console.log('reloading');
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

  onFileSelect(event: Event): void {
    this.imageChangedEvent = event;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  cropImage(event: ImageCroppedEvent): void {
    this.croppedFile = event.blob!;
    this.imagePreviewLink = event.objectUrl!;
  }

  loadImage(): void {}

  initCropper(): void {}

  loadImageFailed(): void {}

  onSubmit(): void {
    console.log(this.regForm.value);
    if (!this.regForm.valid) {
      return;
    }

    const model: SignUpDto = {
      ...this.regForm.value,
    };
    const formData: FormData = new FormData();
    formData.append('Email', model.Email);
    formData.append('UserName', model.UserName);
    formData.append('Password', model.Password);
    formData.append('ConfirmPassword', model.confirmPassword);
    if (this.croppedFile != null) {
      formData.append('ProfileImage', this.croppedFile, this.file?.name);
    }
    console.log(model);
    const file = formData.get('ProfileImage');
    console.log(file);
    this.store.dispatch(signUpActions.RegistrationRequest({ file: formData }));
  }
}
