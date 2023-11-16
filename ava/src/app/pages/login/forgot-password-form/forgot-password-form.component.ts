import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ResetPasswordsService } from 'app/services/reset-password.service';
import { SucessoModalComponent } from 'app/components/modais/sucesso/sucesso/sucesso.component';
import { LoadingService } from 'app/services/loading.service';
import { CustomValidations } from 'app/validators/custom.validator';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  private tipoCampoSubject = new BehaviorSubject<string>('');
  tipoCampo$: Observable<string> = this.tipoCampoSubject.asObservable();
  apenasNumero = /^[0-9]+$/ as RegExp;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private resetPassswordService: ResetPasswordsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      recuperaSenhaInput: ['', [Validators.required]],
      recaptcha: [null, [Validators.nullValidator]],
    });
    this.tipoCampo$.subscribe((value) => {
      console.log(value);
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
          this.tipoCampoSubject.next('ra');
          break;
        case 11:
          this.tipoCampoSubject.next('cpf');
          break;
        default:
          break;
      }
    } else if (campo?.value.includes('@')) {
      this.tipoCampoSubject.next('email');
    }
  }

  addValidacoes() {
    this.tipoCampo$.subscribe((tipoCampo) => {
      console.log(tipoCampo, 'tipo');
      switch (tipoCampo) {
        case 'ra': {
          this.forgotPasswordForm
            .get('recuperaSenhaInput')
            ?.setValidators([
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(this.apenasNumero),
            ]);
          break;
        }
        case 'cpf': {
          this.forgotPasswordForm
            .get('recuperaSenhaInput')
            ?.setValidators([
              Validators.pattern(this.apenasNumero),
              Validators.minLength(11),
              Validators.maxLength(11),
              CustomValidations.validateCpf,
            ]);
          const formattedValue = this.forgotPasswordForm
            .get('recuperaSenhaInput')
            ?.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
          this.forgotPasswordForm
            .get('recuperaSenhaInput')
            ?.setValue(formattedValue, { emitEvent: false });
          break;
        }
        case 'email': {
          this.forgotPasswordForm
            .get('recuperaSenhaInput')
            ?.setValidators([Validators.email]);
          break;
        }
        default: {
          return;
        }
      }
      this.forgotPasswordForm
        .get('recuperaSenhaInput')
        ?.updateValueAndValidity();
    });
  }

  RecoverPassword() {
    let campo = this.forgotPasswordForm.get('recuperaSenhaInput')
      ?.value as string;
    this.loadingService.show();
    let tipoCampo = '' as string;
    this.tipoCampo$.subscribe((value) => {
      tipoCampo = value;
    }),
      this.enviaEmail(
        tipoCampo,
        this.forgotPasswordForm.get('recuperaSenhaInput')?.value as string
      );
  }

  enviaEmail(tipoCampoRecuperacao: string, campoRecuperacao: string) {
    this.resetPassswordService
      .enviaEmail(tipoCampoRecuperacao, campoRecuperacao)
      .subscribe({
        next: (response) => {
          if (response.StatusCode === 200) {
            this.modalSucessoEnvioEmail(response.Message);
          }
        },
        error: (error) => {
          if (error.statusCode === 404)
            this.modalSucessoEnvioEmail('Usuário não encontrado.');
        },
      });
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
