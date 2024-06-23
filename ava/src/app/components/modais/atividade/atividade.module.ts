import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarAtividadeComponent } from './adicionar-atividade/adicionar-atividade.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'app/components/message/message.module';
import { CriarOuEditarAtividadeModule } from 'app/shared/Atividade/CriarOuEditar.module';
import { EditarAtividadeComponent } from './editar-atividade/editar-atividade.component';

@NgModule({
  declarations: [AdicionarAtividadeComponent, EditarAtividadeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    EditorModule,
    ReactiveFormsModule,
    MessageModule,
    CriarOuEditarAtividadeModule,
  ],
  exports: [AdicionarAtividadeComponent, EditarAtividadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AtividadeModule {}
