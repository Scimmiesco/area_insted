import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { LoginRoutingModule } from 'app/pages/login/login-routing.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { MaterialModule } from 'app/components/material/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MenuBottomComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule, SideNavModule, MaterialModule, HttpClientModule, AngularSvgIconModule 
  ], exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
