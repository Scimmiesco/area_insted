import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from 'app/services/forgot-password.service';
import { AutenticationService } from 'app/services/autentication.service';
import { ResetPasswordComponent } from './reset-password.component';
// ... outros imports ...

@NgModule({
  declarations: [ResetPasswordComponent],
  exports: [
    /* ... */
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, // Certifique-se de importar o ReactiveFormsModule aqui
    // ... outros módulos ...
  ],
  providers: [ForgotPasswordService, AutenticationService],
})
export class ResetPasswordModule {} // Renomeie o módulo para "ResetPasswordModule"
