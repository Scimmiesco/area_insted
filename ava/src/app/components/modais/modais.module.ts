import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HorarioModule } from './horario/horario.module';
import { CalendarModule } from './calendar/calendar.module';
import { RetornoRequisicaoModalModule } from './retornoRequisicao/retornoRequisicao.module';
import { NotasComponent } from './notas/notas.component';
import { NotasModule } from './notas/notas.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
    NotasModule,
  ],
  exports: [
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
    NotasModule,
  ],
})
export class ModaisModule {}
