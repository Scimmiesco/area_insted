import { AutenticationService } from './../autentication/autentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message/message.module';
import { InputRestrictionDirective } from 'app/input-restriction.directive';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from './forgot-password-form/forgot-password.service';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent,
    InputRestrictionDirective,
  ],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MessageModule,
    HttpClientModule
  ],providers: [ForgotPasswordService, AutenticationService],
})
export class LoginModule {}
