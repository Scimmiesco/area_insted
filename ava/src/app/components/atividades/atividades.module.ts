import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoComponent } from './arquivo/arquivo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from '../material/material.module';
import { MateriaAtividadesModule } from 'app/pages/materiaAtividades/materiaAtividades.module';

@NgModule({
  declarations: [ArquivoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  exports: [ArquivoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AtividadesModule {}
