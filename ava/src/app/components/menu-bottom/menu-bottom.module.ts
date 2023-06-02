import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { LoginRoutingModule } from 'app/pages/login/login-routing.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { MaterialModule } from 'app/components/material/material.module';



@NgModule({
  declarations: [
    MenuBottomComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule, SideNavModule, MaterialModule
  ], exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
