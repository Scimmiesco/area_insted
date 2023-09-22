import { AutenticationService } from 'app/services/autentication.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'app/components/material/material.module';
import { MenuBottomModule } from 'app/components/menu-bottom/menu-bottom.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MenuBottomModule],
  exports: [ProfileComponent],
  providers: [AutenticationService]
})
export class ProfileModule { }
