import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from 'app/services/forgot-password.service';
import { AutenticationService } from 'app/services/autentication.service';
import { ResetPasswordComponent } from './reset-password.component';
import { MessageModule } from "../../components/message/message.module";
// ... outros imports ...

@NgModule({
    declarations: [ResetPasswordComponent],
    exports: [
    /* ... */
    ],
    providers: [ForgotPasswordService, AutenticationService],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MessageModule
    ]
})
export class ResetPasswordModule {} // Renomeie o módulo para "ResetPasswordModule"
