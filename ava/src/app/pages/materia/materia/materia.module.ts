import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia.component';
import { RouterModule } from '@angular/router';
import { MenuBottomModule } from 'app/components/menu-bottom/menu-bottom.module';

@NgModule({
  declarations: [MateriaComponent],
  imports: [CommonModule, RouterModule],
  exports: [MateriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaModule {}
