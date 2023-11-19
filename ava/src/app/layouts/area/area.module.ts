import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { SideNavModule } from 'app/components/side-nav/side-nav.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, MaterialModule,SideNavModule
  ]
})
export class AreaModule { }
