import { AutenticationService } from 'app/autentication/autentication.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/autentication/user/user.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup; //É estânciado no OnInit
  loginError = false as boolean;
  ra = '' as string;
  password = '' as string;
  isUserValid = true;
  errorMessage = '';
  token: string | undefined;

  constructor(
    // token = '',
    private authService: AutenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
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
      this.authService.auth(loginRequest).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response.user, "Método login")
            this.userService.setUser(response.user);
            this.router.navigate(['/area/home']);
          }
        },
        error: (error) => {
          if (error.status === 500) {
            this.isUserValid = false;
            this.errorMessage = 'Erro de conexão com o servidor.';
          } else if (error.status === 404) {
            this.isUserValid = false;
            this.errorMessage = 'Usuário ou senha inválidos.';
          } else {
            console.error('Failed to login', error);
          }
        },
      });
    }
  }

  ToggleIcon(event: MouseEvent) {
    event.preventDefault(); // Interrompe o comportamento padrão do navegador
    let password = document.getElementById('password') as HTMLInputElement;
    let icon = document.getElementById('icon');
    if (password?.type === 'password') {
      password.setAttribute('type', 'text');
      icon?.classList?.add('hide');
    } else {
      password?.setAttribute('type', 'password');
      icon?.classList?.remove('hide');
    }
  }
}
