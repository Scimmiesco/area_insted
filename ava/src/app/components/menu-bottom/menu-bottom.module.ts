import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { LoginRoutingModule } from 'app/login/login-routing.module';



@NgModule({
  declarations: [
    MenuBottomComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ], exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
