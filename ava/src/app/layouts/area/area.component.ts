import { UserService } from 'app/services/user.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken, setUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { AreaService } from 'app/services/area.service';
import { MateriasService } from 'app/services/materias.service';
import { userResponse } from 'app/Interfaces/user.Interface';
import { ResponseMateriasInterface } from 'app/Interfaces/home.interface';

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
    store.dispatch(setUser({ payload: areaService.user }));
  }

  getDados() {
    this.getMaterias();

  }
  getMaterias() {
    this.materiasService.getHttpMaterias(this.tokenService.getDataFromToken());
    
  }

  getUser() {
    this.userService.getUser();
  }



}
