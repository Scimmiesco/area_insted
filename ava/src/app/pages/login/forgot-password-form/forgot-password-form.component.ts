import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ResetPasswordsService } from 'app/services/reset-password.service';
import { SucessoModalComponent } from 'app/components/modais/sucesso/sucesso/sucesso.component';
import { LoadingService } from 'app/services/loading.service';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  recuperaSenhaInput = '' as string;
  apenasNumero = /^\d{10}$/ as RegExp;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private resetPassswordService: ResetPasswordsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      recuperaSenhaInput: ['', [Validators.required]],
    });
  }

  recuperaTipoCampo(): string {
    let campo = this.forgotPasswordForm.get('recuperaSenhaInput')
      ?.value as string;

    if (campo.length === 10) {
      return 'ra';
    } else if (campo.length === 11) {
      return 'cpf';
    } else {
      return 'email';
    }
  }

  RecoverPassword() {
    let campo = this.forgotPasswordForm.get('recuperaSenhaInput')
      ?.value as string;
    if (
      this.forgotPasswordForm.valid &&
      this.forgotPasswordForm.get('recaptcha')?.value
    ) {
      switch (this.recuperaTipoCampo()) {
        case 'ra':
          if (this.apenasNumero.test(campo) && campo.length === 11) {
          }
          break;
        case 'email':
          if (
            this.forgotPasswordForm
              .get('recuperaSenhaInput')
              ?.addValidators(Validators.email)
          ) {
          }
      }

      this.loadingService.show();
      this.enviaEmail(
        this.recuperaTipoCampo(),
        this.forgotPasswordForm.get('recuperaSenhaInput')?.value as string
      );
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
}
