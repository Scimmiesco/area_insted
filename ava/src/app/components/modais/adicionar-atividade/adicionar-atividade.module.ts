import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarAtividadeComponent } from './adicionar-atividade.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdicionarAtividadeComponent],
  imports: [CommonModule, BrowserModule, EditorModule, ReactiveFormsModule],
  exports: [AdicionarAtividadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdicionarAtividadeModule {}
