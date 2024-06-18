import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarAtividadeComponent } from './adicionar-atividade.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'app/components/message/message.module';

@NgModule({
  declarations: [AdicionarAtividadeComponent],
  imports: [CommonModule, BrowserModule, EditorModule, ReactiveFormsModule, MessageModule],
  exports: [AdicionarAtividadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdicionarAtividadeModule {}
