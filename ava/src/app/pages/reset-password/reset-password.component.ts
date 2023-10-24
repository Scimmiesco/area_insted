import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SucessoModalComponent } from 'app/components/modais/sucesso/sucesso/sucesso.component';
import { LoadingService } from 'app/services/loading.service';
import { ResetPasswordsService } from 'app/services/reset-password.service';
import { CustomValidations } from 'app/validators/custom.validator';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  senhaNova = '' as string;
  confirmaSenhaNova = '' as string;
  errorMessage = '' as string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private resetPasswordsService: ResetPasswordsService,
    public dialog: MatDialog
  ) {}

    ngOnInit(): void {
      this.resetPasswordForm = this.formBuilder.group(
        {
          senhaNova: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(16),
            ],
          ],
          confirmaSenhaNova: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(16),
            ],
          ],
        },
        {
          validators: CustomValidations.matchInputs(
            'senhaNova',
            'confirmaSenhaNova'
          ),
        }
      );
    }
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.alteraSenha();
    }
  }

  alteraSenha() {
    let senhaNova: string = CryptoJS.SHA512(
      this.resetPasswordForm.get('confirmaSenhaNova')?.value.toString()
    ).toString();

    this.resetPasswordsService.trocaSenha(senhaNova).subscribe({
      next: (response) => {
        this.modalSucessoEnvioEmail(response.Message);
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  modalSucessoEnvioEmail(message: string) {
    this.dialog.open(SucessoModalComponent, {
      data: { message: message },
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'sucesso',
    });
  }
}
