import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidations } from 'app/validators.component';
import { catchError, throwError } from 'rxjs';
import { ForgotPasswordService } from './forgot-password.service';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  ra = '' as string;
  email = '' as string;
  cpf = '' as string;
  someInputFilled = false as boolean;

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      ra: ['', [Validators.minLength(10)]],
      email: ['', [Validators.email]],
      cpf: ['', [CustomValidations.validateCpf]],
    });
  }

  RecoverPassword() {
    let recoverField = '';
    let fieldType = '';

    if (this.forgotPasswordForm.get('ra')?.value) {
      recoverField = this.forgotPasswordForm.get('ra')?.value;
      fieldType = 'ra';
    } else if (this.forgotPasswordForm.get('email')?.value) {
      recoverField = this.forgotPasswordForm.get('email')?.value;
      fieldType = 'email';
    } else if (this.forgotPasswordForm.get('cpf')?.value) {
      recoverField = this.forgotPasswordForm.get('cpf')?.value;
      fieldType = 'cpf';
    }

    this.recoverPasswordService
      .getUserOnSystem(fieldType, recoverField)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: (response: object) => {
          console.log('e-mail do usuário: ', response.toString());
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  verificarInputs(e: KeyboardEvent) {
    if (this.ra != '' || this.email != '' || this.cpf != '') {
      this.someInputFilled = true;
    } else {
      if (this.ra == '' && this.email == '' && this.cpf == '') {
        this.someInputFilled = false;
      }
    }
  }
}
