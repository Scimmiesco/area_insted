import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element/bundle';
register();
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

/**
 * @title Injecting data when opening a dialog
 */

@Component({
  selector: 'app-modal-calendar',
  templateUrl: 'calendar.component.html',
})
export class calendarDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }


}
