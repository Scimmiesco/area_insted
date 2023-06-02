import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { LayoutsComponent } from 'app/layouts/layouts.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () =>
      import('app/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'layout',
    component: LayoutsComponent,
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
