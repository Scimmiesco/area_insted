import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../calendar/calendar.component';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element/bundle';
export interface TipoAtividade {
  TipoID: number;
  nomeTipo: string;
}
@Component({
  selector: 'app-adicionar-atividade',
  templateUrl: './adicionar-atividade.component.html',
})
export class AdicionarAtividadeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  selectTipoAtividade: TipoAtividade[] = [
    {
      TipoID: 1,
      nomeTipo: 'Texto',
    },
    {
      TipoID: 2,
      nomeTipo: 'Página',
    },
    {
      TipoID: 3,
      nomeTipo: 'Arquivo',
    },
  ];

  ngOnInit(): void {}
}
