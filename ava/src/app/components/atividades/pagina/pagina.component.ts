import { Component, Input } from '@angular/core';
import {
  IAtividadePagina,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
})
export class PaginaComponent {
  @Input() atividadePagina!: IAtividadePagina;

  atividadeVista!: boolean;
  EnumTiposAtividades = TiposAtividades;

  constructor() {
    this.atividadeVista = false;
  }

  ngOnInit(): void {}
  marcarVisto() {
    this.atividadeVista = !this.atividadeVista;
  }
}
