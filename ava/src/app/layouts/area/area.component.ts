import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken, setUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { AreaService } from 'app/services/area.service';
import { MateriasService } from 'app/services/materias.service';
import { materiaPadrao } from 'app/Interfaces/materias.interface';
import { MediaMatcher } from '@angular/cdk/layout';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { MatDialog } from '@angular/material/dialog';
import { HorarioDialogComponent } from 'app/components/modais/horario/horario.component';
import { calendarDialogComponent } from 'app/components/modais/calendar/calendar.component';
import { TemaService } from 'app/services/tema.service';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent {
  tokenSession = localStorage.getItem('token') || '';
  icons!: IconInterface[];

  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private userService: UserService,
    private materiasService: MateriasService,
    public temaService: TemaService,
    private tamanhoDaTelaService: TamanhoDaTelaService
  ) {
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());

    this.icons = Icons;
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    this.getDados();
  }
  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() =>
      this.handleScreenSizeChange()
    );
  }
  getDados() {
    this.getUser();
    this.getMaterias();
  }

  getMaterias() {
    let ra = this.tokenService.getDataFromToken().unique_name;

    this.materiasService.materias$.subscribe((materias) => {
      if (
        materias === null ||
        materias.length === 0 ||
        materias === materiaPadrao
      ) {
        this.materiasService.getHttpMaterias(ra);
      }
    });
  }
  OpenModais(iconId: number) {
    switch (iconId) {
      case 1:
        this.dialog.open(HorarioDialogComponent, {
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
      default:
        break;
    }
  }
  getUser() {
    this.userService.getUser();
  }
  mudarTema() {
    let temas = ['light', 'dark'] as string[];
    let localStorageTema = localStorage.getItem('tema') || 'light';
    let index = temas.indexOf(localStorageTema);

    let proximoIndice = (index + 1) % temas.length;

    localStorage.setItem('tema', temas[proximoIndice]);

    this.temaService.mudarTema(temas[proximoIndice]);
  }

  public handleScreenSizeChange(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }
}
