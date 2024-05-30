import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaAtividadesComponent } from './materiaAtividades.component';
import { MaterialModule } from 'app/components/material/material.module';
import { AtividadesModule } from 'app/components/atividades/atividades.module';

@NgModule({
  declarations: [MateriaAtividadesComponent],
  imports: [CommonModule, MaterialModule, AtividadesModule],
  exports: [MateriaAtividadesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaAtividadesModule {}
