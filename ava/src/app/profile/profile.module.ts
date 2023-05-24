import { MatIconModule } from '@angular/material/icon';
import { AutenticationService } from './../autentication/autentication.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserService } from 'app/autentication/user/user.service';
import { MaterialModule } from 'app/material/material.module';
import { MenuBottomModule } from 'app/components/menu-bottom/menu-bottom.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MenuBottomModule],
  exports: [ProfileComponent],
  providers: [UserService, AutenticationService]
})
export class ProfileModule { }
