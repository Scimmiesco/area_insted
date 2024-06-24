import { Component, Input } from '@angular/core';
import {
  IAtividadeArquivo,
  TiposAtividades,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.css'],
})
export class ArquivoComponent {
  @Input() atividadeArquivo!: IAtividadeArquivo;

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
