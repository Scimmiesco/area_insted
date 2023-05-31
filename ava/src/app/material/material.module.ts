import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MatGridListModule } from '@angular/material/grid-list';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import {MatSidenavModule} from '@angular/material/sidenav';
const MODULES = [MatProgressSpinnerModule, MatExpansionModule, MdbCarouselModule, MatGridListModule, MdbDropdownModule, MatSidenavModule]

@NgModule
  ({
    imports: [MODULES],
    exports: [MODULES]
  })
export class MaterialModule { }
