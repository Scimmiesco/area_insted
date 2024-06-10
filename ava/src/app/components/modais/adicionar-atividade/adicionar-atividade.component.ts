import { Component, OnInit } from '@angular/core';

export interface TipoAtividade {
  TipoID: number;
  nomeTipo: string;
}
@Component({
  selector: 'app-adicionar-atividade',
  templateUrl: './adicionar-atividade.component.html',
})
export class AdicionarAtividadeComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
