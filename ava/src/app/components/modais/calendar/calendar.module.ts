import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { calendarDialogComponent } from './calendar.component';



@NgModule({
  declarations: [calendarDialogComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports:[calendarDialogComponent]
})
export class CalendarModule { }
