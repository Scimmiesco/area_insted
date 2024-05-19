import { Component, Input } from '@angular/core';
import {
  IAtividadesComponent,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.css'],
})
export class ArquivoComponent {
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
