import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { AreaComponent } from 'app/layouts/area/area.component';
import { AreaAuthGuard } from 'app/layouts/area/area-auth.guard';
import { LoginAuthGuard } from './pages/login/login-auth.guard';

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
    canActivate: [AreaAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
