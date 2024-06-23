import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InfoModalAddAtividade } from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-editar-atividade',
  templateUrl: './editar-atividade.component.html',
})
export class EditarAtividadeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InfoModalAddAtividade,
    public dialog: MatDialog
  ) {

    console.log('dataDaTela', data);
  }
}
