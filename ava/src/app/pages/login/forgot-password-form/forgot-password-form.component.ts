import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ResetPasswordsService } from 'app/services/reset-password.service';
import { RetornoRequisicaoModalComponent } from 'app/components/modais/retornoRequisicao/retornoRequisicao.component';
import { LoadingService } from 'app/services/loading.service';
import { CustomValidations } from 'app/validators/custom.validator';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginFormService } from 'app/services/login-form.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  private tipoCampoSubject = new BehaviorSubject<string>('');
  tipoCampo$: Observable<string> = this.tipoCampoSubject.asObservable();
  apenasNumero = /^[0-9]+$/ as RegExp;
  emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i as RegExp;
  cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ as RegExp;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private resetPassswordService: ResetPasswordsService,
    public loginFormService: LoginFormService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      recuperaSenhaInput: ['', [Validators.required, Validators.minLength(1)]],
      recaptcha: [null, [Validators.nullValidator]],
      submit: [false],
    });
  }
  recuperaTipoCampo() {
    let campo = this.forgotPasswordForm.get('recuperaSenhaInput');

    if (this.apenasNumero.test(campo?.value) || campo?.value === '') {
      switch (campo?.value.length) {
        case 0:
          this.tipoCampoSubject.next('');
          break;
        case 10:
          if (campo.value.length === 10) {
            this.tipoCampoSubject.next('ra');
          }
          break;
        case 11:
          this.tipoCampoSubject.next('cpf');
          break;
        default:
          this.tipoCampoSubject.next('');
          break;
      }
    } else if (this.emailRegex.test(campo?.value)) {
      this.tipoCampoSubject.next('email');
    } else {
      this.tipoCampoSubject.next('');
    }
  }

  RecoverPassword() {
    if (this.forgotPasswordForm.valid) {
      let tipoCampo = '' as string;

      this.tipoCampo$.subscribe((value) => {
        tipoCampo = value;
      }),
        this.enviaEmail(
          tipoCampo,
          this.forgotPasswordForm.get('recuperaSenhaInput')?.value as string
        );
    }
  }

  enviaEmail(tipoCampoRecuperacao: string, campoRecuperacao: string) {
    this.resetPassswordService
      .enviaEmail(tipoCampoRecuperacao, campoRecuperacao)
      .subscribe({
        next: (response) => {
          if (response.StatusCode === 200) {
            this.retornarModal(response.Message, 'sucesso');
          }
        },
        error: (error) => {
          switch (error.status) {
            case 404: {
              this.retornarModal('Usuário não encontrado.', 'erro');
              break;
            }
            case 400: {
              this.retornarModal(
                'Por favor, preencha CPF ou e-mail ou RA.',
                'erro'
              );
              break;
            }
            case 500: {
              this.retornarModal(
                'Erro de conexão com o servidor. Tente novamente.',
                'erro'
              );
              break;
            }
          }
        },
      });
  }

  retornarModal(message: string, tipoRetorno: string) {
    this.dialog.open(RetornoRequisicaoModalComponent, {
      data: {
        message: message,
        tipoRetorno: tipoRetorno,
      },
      autoFocus: true,
      closeOnNavigation: true,
    });
  }
}
