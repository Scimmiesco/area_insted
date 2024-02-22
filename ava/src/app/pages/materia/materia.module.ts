import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia.component';
import { MaterialModule } from 'app/components/material/material.module';

@NgModule({
  declarations: [MateriaComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MateriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaModule {}
