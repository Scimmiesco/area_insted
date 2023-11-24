import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HorarioModule } from './horario/horario.module';
import { CalendarModule } from './calendar/calendar.module';
import { RetornoRequisicaoModalModule } from './retornoRequisicao/retornoRequisicao.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
  ],
  exports: [
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
  ],
})
export class ModaisModule {}
