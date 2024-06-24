import { Component, Input } from '@angular/core';
import {
  IAtividadeTexto,
} from 'app/Interfaces/atividade.interface';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
})
export class TextoComponent {
  @Input() atividadeTexto!: IAtividadeTexto;
}
