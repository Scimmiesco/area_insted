import { AdicionarAtividadeModule } from './adicionar-atividade/adicionar-atividade.module';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HorarioModule } from './horario/horario.module';
import { CalendarModule } from './calendar/calendar.module';
import { RetornoRequisicaoModalModule } from './retornoRequisicao/retornoRequisicao.module';
import { NotasModule } from './notas/notas.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
    NotasModule,
    FinanceiroModule,
    AdicionarAtividadeModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [
    HorarioModule,
    CalendarModule,
    RetornoRequisicaoModalModule,
    NotasModule,
    FinanceiroModule,
    AdicionarAtividadeModule,
  ],
})
export class ModaisModule {}
