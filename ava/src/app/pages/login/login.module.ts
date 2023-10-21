import { AutenticationService } from 'app/services/autentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'app/components/message/message.module';
import { InputRestrictionDirective } from 'app/directives/input-restriction.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { MaterialModule } from 'app/components/material/material.module';
import { LoadingInterceptor } from 'app/interceptors/loading.interceptor';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from 'environments/environment';

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
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    ForgotPasswordService,
    AutenticationService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class LoginModule {}
