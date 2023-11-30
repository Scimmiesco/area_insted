import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ChangeDetectorRef, Component } from '@angular/core';
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

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent {
  tokenSession = localStorage.getItem('token') || '';

  temas = [
    { id: 1, label: 'Modo claro', icon: 'light_mode' },
    { id: 2, label: 'Modo escuro', icon: 'dark_mode' },
    { id: 3, label: 'Sistema', icon: 'smartphone' },
  ];
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  icons!: IconInterface[];
  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private userService: UserService,
    private materiasService: MateriasService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 750px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.icons = Icons;

    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    this.getDados();
  }
  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
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
  mudarTema(id: number) {
    const themes = ['light', 'dark'];
    const currentTheme = localStorage.getItem('theme');
    const selectedTheme = id === 3 ? null : themes[id - 1];

    if (currentTheme !== selectedTheme) {
      if (selectedTheme === null) {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', selectedTheme);
      }
      location.reload();
    }
  }
}
