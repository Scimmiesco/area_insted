import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalSucessoI } from 'app/Interfaces/sucesso.interface';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Input()
export class SucessoModalComponent {
  message = '' as string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: modalSucessoI) {
    this.message = data.message;
  }
}
