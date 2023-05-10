import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MdbCarouselModule],
  exports: [HomeComponent],
})
export class HomeModule {}
