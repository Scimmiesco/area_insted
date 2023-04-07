import { AutenticationService } from './../../autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup; //É estânciado no OnInit

  ra = '' as string;
  password = '' as string;

  constructor(
    private authService: AutenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      ra: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
    });
  }
  Login() {
    this.authService.autenticate(this.ra, this.password).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      },
    });
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
