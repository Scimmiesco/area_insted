import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../calendar/calendar.component';
import { MateriasService } from 'app/services/materias.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
})
export class HorarioDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public materiasService: MateriasService
  ) {}
}
