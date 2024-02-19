import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../calendar/calendar.component';
import { MateriasService } from 'app/services/materias.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
})
export class notasDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public materiasService: MateriasService
  ) {}
}
