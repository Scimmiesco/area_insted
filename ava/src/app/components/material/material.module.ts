import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputMaskModule } from 'primeng/inputmask';
const MODULES = [
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatGridListModule,
  MdbDropdownModule,
  MatSidenavModule,
  MatDialogModule,
  MatButtonModule,
  InputMaskModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class MaterialModule {}
