import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoComponent } from './arquivo/arquivo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from '../material/material.module';
import { PaginaComponent } from './pagina/pagina.component';

@NgModule({
  declarations: [ArquivoComponent,PaginaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  exports: [ArquivoComponent, PaginaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AtividadesModule {}
