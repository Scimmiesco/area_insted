import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomValidations } from 'app/validators/custom.validator';
import { ForgotPasswordService } from 'app/services/forgot-password.service';
import { ResetPasswordsService } from 'app/services/reset-password.service';
import { SucessoModalComponent } from 'app/components/modais/sucesso/sucesso/sucesso.component';
import { LoadingService } from 'app/services/loading.service';
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
    public dialog: MatDialog,
    private resetPassswordService: ResetPasswordsService,
    private loadingService: LoadingService
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
    if (this.filledInputs.length === 0) {
      return;
    }
    if (
      this.forgotPasswordForm.valid &&
      this.forgotPasswordForm.get('recaptcha')?.value &&
      !this.moreThanOneInputFilled
    ) {
      let campoRecuperacao: string = '';
      let tipoCampoRecuperacao: string = '';

      const fieldMap: { [key: string]: any } = {
        ra: this.forgotPasswordForm.get('ra')?.value,
        email: this.forgotPasswordForm.get('email')?.value,
        cpf: this.forgotPasswordForm.get('cpf')?.value,
      };

      for (const field in fieldMap) {
        if (fieldMap[field]) {
          campoRecuperacao = fieldMap[field];
          tipoCampoRecuperacao = field;
          break;
        }
      }
      this.loadingService.show();
      this.enviaEmail(tipoCampoRecuperacao, campoRecuperacao);
    }
  }

  enviaEmail(tipoCampoRecuperacao: string, campoRecuperacao: string) {
    this.resetPassswordService
      .enviaEmail(tipoCampoRecuperacao, campoRecuperacao)
      .subscribe(
        (response) => {
          if (response.StatusCode === 200) {
            this.modalSucessoEnvioEmail(response.Message);
          }
        },
        (error) => {
          if (error.statusCode === 404)
            this.modalSucessoEnvioEmail('Usuário não encontrado.');
        }
      );
  }

  modalSucessoEnvioEmail(message: string) {
    this.dialog.open(SucessoModalComponent, {
      data: {
        message: message,
      },
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'horario-modal',
    });
  }

  isMoreThanOneInputFilled(e: KeyboardEvent) {
    const inputs = [this.ra, this.email, this.cpf];
    this.filledInputs = inputs.filter((input) => input && input.length > 0);
    this.moreThanOneInputFilled = this.filledInputs.length > 1;
  }
}
