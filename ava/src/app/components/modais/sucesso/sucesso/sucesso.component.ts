import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../calendar/calendar.component';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SucessoModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
