import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HorarioDialogComponent } from '../modais/horario/horario.component';
import { calendarDialogComponent } from '../modais/calendar/calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { TemaService } from 'app/services/tema.service';
import { notasDialogComponent } from '../modais/notas/notas.component';
import { FinanceiroDialogComponent } from '../modais/financeiro/financeiro.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  icons!: IconInterface[];

  constructor(
    private tamanhoDaTelaService: TamanhoDaTelaService,
    public dialog: MatDialog,
    public temaService: TemaService,
    public router: Router,
    private location: Location
  ) {
    this.icons = Icons;
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());
  }
  reason = '';
  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() =>
      this.handleScreenSizeChange()
    );
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  mudarTema() {
    let temas = ['light', 'dark'] as string[];
    let localStorageTema = localStorage.getItem('tema') || 'light';
    let index = temas.indexOf(localStorageTema);

    let proximoIndice = (index + 1) % temas.length;

    localStorage.setItem('tema', temas[proximoIndice]);

    this.temaService.mudarTema(temas[proximoIndice]);
  }

  OpenModais(iconId: number) {
    switch (iconId) {
      case 1:
        this.dialog.open(HorarioDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      case 2:
        this.dialog.open(FinanceiroDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      case 6:
        this.dialog.open(calendarDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      case 7:
        this.dialog.open(notasDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      default:
        break;
    }
  }
  public handleScreenSizeChange(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }

  voltarParaURLAnterior(){
     this.location.back();
  }
}
