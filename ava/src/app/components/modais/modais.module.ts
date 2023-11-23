import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HorarioModule } from './horario/horario.module';
import { CalendarModule } from './calendar/calendar.module';
import { RetornoRequisicaoModalComponent } from './retornoRequisicao/retornoRequisicao.component';

@NgModule({
  declarations: [RetornoRequisicaoModalComponent],
  imports: [CommonModule, MaterialModule, HorarioModule, CalendarModule],
  exports: [HorarioModule, CalendarModule, CommonModule],
})
export class ModaisModule {}
