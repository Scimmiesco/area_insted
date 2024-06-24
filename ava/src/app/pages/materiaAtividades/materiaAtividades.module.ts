import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaAtividadesComponent } from './materiaAtividades.component';
import { MaterialModule } from 'app/components/material/material.module';
import { AtividadesModule } from 'app/components/atividades/atividades.module';
import { AtividadesService } from 'app/services/atividades.service';

@NgModule({
  declarations: [MateriaAtividadesComponent],
  imports: [CommonModule, MaterialModule, AtividadesModule],
  providers: [AtividadesService],
  exports: [MateriaAtividadesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MateriaAtividadesModule {}
