import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaAtividadesComponent } from './materiaAtividades.component';
import { MaterialModule } from 'app/components/material/material.module';
import { AtividadeComponent } from './atividade/atividade.component';

@NgModule({
  declarations: [MateriaAtividadesComponent, AtividadeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MateriaAtividadesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaAtividadesModule {}
