import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken, setUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { AreaService } from 'app/services/area.service';
import { MateriasService } from 'app/services/materias.service';
import { materiaPadrao } from 'app/Interfaces/materias.interface';

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

  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    private userService: UserService,
    private materiasService: MateriasService
  ) {
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    this.getDados();
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
        materias[0] === materiaPadrao
      ) {
        this.materiasService.getHttpMaterias(ra);
      }
    });
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
