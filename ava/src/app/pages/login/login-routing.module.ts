import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginProfessorComponent } from './login-professor/login-professor.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
      },
      {
        path: 'recuperarsenha',
        component: ForgotPasswordFormComponent,
      },
      {
        path: 'professor',
        component: LoginProfessorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
