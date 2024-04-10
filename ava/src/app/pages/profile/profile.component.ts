import { IappState, getUser } from 'app/store/app.state';
import { Component } from '@angular/core';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'app/services/user.service';
import { ResetPasswordsService } from 'app/services/reset-password.service';
import { RetornoRequisicaoModalComponent } from 'app/components/modais/retornoRequisicao/retornoRequisicao.component';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user$!: Observable<Pessoa['user']>;
  resetPasswordForm!: FormGroup;
  status: boolean = true;
  imageLoaded = false;
  passwordIsVisible: boolean = false;

  constructor(
    private router: Router,
    private store: Store<{ app: IappState }>,
    public dialog: MatDialog,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private resetPasswordsService: ResetPasswordsService,
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(getUser);

    this.resetPasswordForm = this.formBuilder.group(
      {
        senhaAtual: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        novaSenha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],confirmeNovaSenha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
      },
    );
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  modalSucessoEnvioEmail(message: string) {
    this.dialog.open(RetornoRequisicaoModalComponent, {
      data: { message: message, tipoModal: 'sucesso' },
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'sucesso',
    });
  }

  onSubmit() {
      this.alteraSenha();
  }


  alteraSenha() {
    let senhaNova: string = CryptoJS.SHA512(
      this.resetPasswordForm.get('confirmeNovaSenha')?.value.toString()
    ).toString();

    this.resetPasswordsService.trocaSenha(senhaNova).subscribe({
      next: (response) => {
        this.modalSucessoEnvioEmail(response.Message);
      },
      error: (error) => {

          this.modalSucessoEnvioEmail(error.message);
      },
      complete: () => {},
    });
  }

}
