import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarAtividadeComponent } from './adicionar-atividade.component';

@NgModule({
  declarations: [AdicionarAtividadeComponent],
  imports: [CommonModule, BrowserModule],
  exports: [AdicionarAtividadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdicionarAtividadeModule {}
