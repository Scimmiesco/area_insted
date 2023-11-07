import { UserService } from 'app/services/user.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken, setUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { AreaService } from 'app/services/area.service';
import { MateriasService } from 'app/services/materias.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent {
  tokenSession = localStorage.getItem('token') || '';

  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    private userService: UserService,
    private areaService: AreaService,
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
      if (materias === null || materias.length === 0) {
        this.materiasService.getHttpMaterias(ra);
      }
    });
  }

  getUser() {
    this.userService.getUser();
  }
}
