import { Component, Input } from '@angular/core';
import {
  IAtividadesComponent,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
})
export class PaginaComponent {
  @Input() atividade!: IAtividadesComponent;

  atividadeVista!: boolean;
  EnumTiposAtividades = TiposAtividades;

  constructor() {
    this.atividadeVista = false;
  }

  ngOnInit(): void {
    console.log(this.atividade);
  }
  marcarVisto() {
    this.atividadeVista = !this.atividadeVista;
  }
}
