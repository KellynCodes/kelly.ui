import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './routes/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from '../../components/components.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, VerifyEmailComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MaterialModule,
    ComponentsModule,
  ],
})
export class AuthModule {}
