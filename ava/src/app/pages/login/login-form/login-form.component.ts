import { TokenService } from 'app/services/token.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticationService } from 'app/services/autentication.service';
import { IappState, setToken } from 'app/store/app.state';
import { LoginInterface, ResponseInterface } from '../login.interface';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup; //É estânciado no OnInit
  errorMessage = null as string | null;
  passwordIsVisible = false as boolean;

  constructor(
    private authService: AutenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      ra: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
      recaptcha: [null],
    });
  }

  Login() {
    if (this.loginForm.valid && this.loginForm.get('recaptcha')?.value) {
      let passwordHashed: string = CryptoJS.SHA512(
        this.loginForm.get('password')?.value
      ).toString();

      const loginRequest: LoginInterface = {
        login: this.loginForm.get('ra')?.value.toString(),
        passwordHashed,
      };
      this.authentication(loginRequest);
    }
  }

  authentication(loginRequest: LoginInterface) {
    this.authService.auth(loginRequest).subscribe({
      next: (response: ResponseInterface) => {
        if (response.success) {
          this.tokenService.saveToken(response.token);
          this.router.navigate(['/area/home']);
        }
      },
      error: (error) => {
        if (error.status === 500) {
          this.errorMessage = 'Erro de conexão com o servidor.';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuário ou senha inválidos.';
        }
      },
    });
  }

  ToggleIcon() {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
