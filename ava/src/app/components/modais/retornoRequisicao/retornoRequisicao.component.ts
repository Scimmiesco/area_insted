import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { retornoRequisicaoI } from 'app/Interfaces/retornoRequisicao-modal.interface';

@Component({
  selector: 'app-sucesso',
  templateUrl: './retornoRequisicao.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Input()
export class RetornoRequisicaoModalComponent {
  message = '' as string;
  tipoRetorno: string = 'sucesso' || 'erro';

  constructor(@Inject(MAT_DIALOG_DATA) public data: retornoRequisicaoI) {
    this.message = data.message;
    this.tipoRetorno = data.tipoRetorno;
  }
}
