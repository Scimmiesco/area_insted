import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia.component';
import { MaterialModule } from 'app/components/material/material.module';
import { AtividadeComponent } from './atividade/atividade.component';

@NgModule({
  declarations: [MateriaComponent, AtividadeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MateriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaModule {}
