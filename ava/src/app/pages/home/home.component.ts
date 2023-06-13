
import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { calendarDialogComponent } from 'app/components/modais/calendar/calendar.component';
import { MateriasService } from 'app/services/materias.service';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';
import { ResponseMateriasInterface } from './home.interface';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { PainelInterface } from 'app/shared/info-painel/painel-home.model';
import { Avisos } from 'app/shared/info-painel/mock-painel-home';
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {

  constructor(public dialog: MatDialog, private materiasService: MateriasService) { }

  user!: Pessoa["user"];
  materias: ResponseMateriasInterface["materias"] = null;
  icons!: IconInterface[]
  avisos!: PainelInterface[]

  ngOnInit() {
    this.avisos = Avisos
    this.icons = Icons
    this.materias = this.materiasService.getMaterias();
    const localStorageKey = localStorage.key(0);

    if (localStorageKey) {
      this.user = JSON.parse(localStorage.getItem(localStorageKey) ?? '{}');
    }

    if (this.materias?.length === 0) {
      this.materiasService.getHttpMaterias(this.user.nrRegister).subscribe({
        next: (response) => {
          this.materiasService.setMaterias(response.materias);
          this.materias = response.materias
        },
        error: (error) => {

        }
      });
    }

  }

  OpenModalCalendar(iconId: number) {
    if (iconId === 1) {
      this.dialog.open(calendarDialogComponent, {
        data: {
          animal: 'panda',
        },
        autoFocus: true,
        closeOnNavigation: true,
        panelClass: 'horario-modal'
      }
      )
    }
  }


}






