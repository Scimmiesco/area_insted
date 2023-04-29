import { AutenticationService } from './../autentication/autentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../components/message/message.module';
import { InputRestrictionDirective } from 'app/input-restriction.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from './forgot-password-form/forgot-password.service';
import { UserService } from 'app/autentication/user/user.service';
import { MaterialModule } from 'app/material/material.module';
import { LoadingInterceptor } from 'app/interceptors/loading.interceptor';

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
    HttpClientModule,
  ], providers: [ForgotPasswordService, AutenticationService, UserService,
  ]
})
export class LoginModule { }
