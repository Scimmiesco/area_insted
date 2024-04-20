import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, MaterialModule, RouterModule, HttpClientModule, AngularSvgIconModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
