import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

const MODULES = [MatProgressSpinnerModule, MatExpansionModule]

@NgModule
  ({
    imports: [MODULES],
    exports: [MODULES]
  })
export class MaterialModule { }
