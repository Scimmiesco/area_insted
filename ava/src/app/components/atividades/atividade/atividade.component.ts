import { Component, Input } from '@angular/core';
import {
  IAtividadesComponent,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
})
export class AtividadeComponent {
  @Input() infosAtividades!: IAtividadesComponent;

  EnumTiposAtividades = TiposAtividades;
}
