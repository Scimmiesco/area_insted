import { TokenService } from 'app/services/token.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticationService } from 'app/services/autentication.service';
import { IappState, setToken } from 'app/store/app.state';
import { LoginInterface, ResponseInterface } from '../login.interface';

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
      const loginRequest = {
        login: this.loginForm.get('ra')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.authentication(loginRequest);
    }
  }

  authentication(loginRequest: LoginInterface) {
    this.authService.auth(loginRequest).subscribe({
      next: (response: ResponseInterface) => {
        if (response.success) {
          console.log('Passando para o save token:',response.token)
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
