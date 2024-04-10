import { AutenticationService } from 'app/services/autentication.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'app/components/material/material.module';
import { MenuBottomModule } from 'app/components/menu-bottom/menu-bottom.module';
import { CpfCnpjPipe } from 'app/pipes/cpf-format.pipe';
import { PhonePipe } from 'app/pipes/telefone.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from "../../components/message/message.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MenuBottomModule,CpfCnpjPipe,PhonePipe,
  ReactiveFormsModule,MessageModule],
  exports: [ProfileComponent],
  providers: [AutenticationService]
})
export class ProfileModule { }
