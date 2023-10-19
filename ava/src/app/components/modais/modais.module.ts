import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HorarioModule } from './horario/horario.module';
import { CalendarModule } from './calendar/calendar.module';
import { SucessoComponent } from './sucesso/sucesso/sucesso.component';



@NgModule({
  declarations: [
    SucessoComponent
  ],
  imports: [
    CommonModule, MaterialModule, HorarioModule, CalendarModule
  ], exports: [HorarioModule, CalendarModule

  ]
})
export class ModaisModule { }
