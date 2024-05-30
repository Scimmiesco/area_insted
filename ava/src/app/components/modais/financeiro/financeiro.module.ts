import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroDialogComponent } from './financeiro.component'; // Importe o componente aqui

@NgModule({
  declarations: [
    FinanceiroDialogComponent // Adicione o componente aos declarations
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinanceiroDialogComponent // Exporte o componente, se necessário
  ]
})
export class FinanceiroModule { }
