import { Component } from '@angular/core';
import { TipoAtividade } from '../adicionar-atividade/adicionar-atividade.component';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css'],
})
export class FinanceiroDialogComponent {
  mensalidades: any[] = [
    {
      tipo: 'Mensalidade',
      vencimento: '10/01/2022',
      valorPago: '544,00',
      situacao: 'Baixada',
    },
  ];

  constructor() {
    this.mensalidades = [
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
      {
        tipo: 'Mensalidade',
        vencimento: '10/01/2022',
        valorPago: '544,00',
        situacao: 'Baixada',
      },
    ];
  }
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
}
