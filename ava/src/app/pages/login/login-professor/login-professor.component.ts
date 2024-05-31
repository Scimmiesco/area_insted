import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css'],
})
export class LoginProfessorComponent implements OnInit {
  loginProfessorForm!: FormGroup;
  passwordIsVisible = false as boolean;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.loginProfessorForm = this.formBuilder.group({
      ra: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
    });
  }
  ToggleIcon() {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
