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
  moreThanOneInputFilled = false as boolean;
  filledInputs = [] as Array<string>;

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      ra: ['', [Validators.minLength(10)]],
      email: ['', [Validators.email]],
      cpf: ['', [CustomValidations.validateCpf]],
      recaptcha: [null],
    });
  }

  RecoverPassword() {
    if ((this.filledInputs.length === 0)) {
      return;
    }
    if (
      this.forgotPasswordForm.valid &&
      this.forgotPasswordForm.get('recaptcha')?.value &&
      !this.moreThanOneInputFilled
    ) {
      let recoverField: string = '';
      let fieldType: string = '';

      const fieldMap: { [key: string]: any } = {
        ra: this.forgotPasswordForm.get('ra')?.value,
        email: this.forgotPasswordForm.get('email')?.value,
        cpf: this.forgotPasswordForm.get('cpf')?.value,
      };

      for (const field in fieldMap) {
        if (fieldMap[field]) {
          recoverField = fieldMap[field];
          fieldType = field;
          break;
        }
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
  }

  isMoreThanOneInputFilled(e: KeyboardEvent) {
    const inputs = [this.ra, this.email, this.cpf];
    this.filledInputs = inputs.filter((input) => input && input.length > 0);

    this.moreThanOneInputFilled = this.filledInputs.length > 1;
  }
}
