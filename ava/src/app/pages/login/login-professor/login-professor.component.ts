import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoginInterface,
  ResponseInterface,
} from 'app/Interfaces/login.interface';
import { EnumCargos } from 'app/Interfaces/token.interface';
import { AutenticationService } from 'app/services/autentication.service';
import { TokenService } from 'app/services/token.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css'],
})
export class LoginProfessorComponent implements OnInit {
  loginProfessorForm!: FormGroup;
  passwordIsVisible = false as boolean;
  errorMessage = null as string | null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticationService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginProfessorForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  Login() {
    if (this.loginProfessorForm.valid) {
      let senhaCriptografada: string = CryptoJS.SHA512(
        this.loginProfessorForm.get('password')?.value
      ).toString();

      const loginRequest: LoginInterface = {
        login: this.loginProfessorForm.get('login')?.value.toString(),
        senhaCriptografada,
      };
      this.authentication(loginRequest);
    }
  }

  authentication(loginRequest: LoginInterface) {
    this.authService.auth(loginRequest).subscribe({
      next: (response: ResponseInterface) => {
        if (response.success) {
          if (
            this.tokenService.getDataFromToken(response.token).role ===
            EnumCargos.PROFESSOR
          ) {
            this.tokenService.saveToken(response.token);
            this.router.navigate(['/area/home']);
          } else {
            this.errorMessage = 'Usuário não possui permissão como docente.';
          }
        }
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this.errorMessage = 'Erro de conexão com o servidor.';
            break;
          case 404:
            this.errorMessage = 'Usuário Inválido.';
            break;
          case 401:
            this.errorMessage = 'Senha inválida.';
            break;
          case 403:
            this.errorMessage =
              'Tentativas inválidas excedidas. Tente novamente em 3 minutos.';
            break;
          default:
            this.errorMessage =
              'Erro desconhecido ao entrar. Contate o suporte.';
        }
      },
    });
  }

  ToggleIcon() {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
