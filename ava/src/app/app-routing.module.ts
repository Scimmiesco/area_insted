import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { AreaComponent } from 'app/layouts/area/area.component';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordAuthGuard } from './guards/reset-password.guard';
import { MateriaAtividadesComponent } from './pages/materiaAtividades/materiaAtividades.component';
import { HorarioAulasComponent } from './pages/horario-aulas/horario-aulas.component';
import { AreaAuthGuard } from './guards/area-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    canActivate: [LoginAuthGuard],
    loadChildren: () =>
      import('app/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'area',
    component: AreaComponent,
    // canActivate: [AreaAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: ProfileComponent },
      { path: 'materia/:id', component: MateriaAtividadesComponent },
      { path: 'horarioAulas', component: HorarioAulasComponent },
    ],
  },
  {
    path: 'minhaconta',
    canActivate: [ResetPasswordAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'trocasenha' },
      { path: 'trocasenha', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
