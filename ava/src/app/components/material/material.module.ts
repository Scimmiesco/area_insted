import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

const MODULES = [
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatGridListModule,
  MdbDropdownModule,
  MatSidenavModule,
  MatDialogModule,
  MatButtonModule,
  MatMenuModule,
  MatTooltipModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class MaterialModule {}
