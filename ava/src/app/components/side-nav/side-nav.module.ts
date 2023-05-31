import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MaterialModule } from 'app/material/material.module';



@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule { }
