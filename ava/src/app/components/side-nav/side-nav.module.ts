import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
