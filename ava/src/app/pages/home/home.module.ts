import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenuBottomModule } from 'app/components/menu-bottom/menu-bottom.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MenuBottomModule],
  exports: [HomeComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
