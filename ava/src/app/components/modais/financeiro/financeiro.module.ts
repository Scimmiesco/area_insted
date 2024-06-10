import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroDialogComponent } from './financeiro.component'; // Importe o componente aqui

@NgModule({
  declarations: [FinanceiroDialogComponent],
  imports: [CommonModule],
  exports: [FinanceiroDialogComponent],
})
export class FinanceiroModule {}
