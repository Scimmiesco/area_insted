import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarOuEditarAtividadeComponent } from './CriarOuEditar.component';
import { MaterialModule } from 'app/components/material/material.module';
import { AtividadesModule } from 'app/components/atividades/atividades.module';
import { AtividadesService } from 'app/services/atividades.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MessageModule } from 'app/components/message/message.module';
import { AtividadeModule } from 'app/components/modais/atividade/atividade.module';
import { ModaisModule } from 'app/components/modais/modais.module';

@NgModule({
  declarations: [CriarOuEditarAtividadeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    EditorModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  providers: [AtividadesService],
  exports: [CriarOuEditarAtividadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CriarOuEditarAtividadeModule {}
