import { UserService } from 'app/services/user.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken, setUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { AreaService } from 'app/services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent {
  tokenSession = localStorage.getItem('token') || '';

  constructor(
    store: Store<{ app: IappState }>,
    tokenservice: TokenService,
    userService: UserService,
    areaService: AreaService
  ) {
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    userService.getUser().subscribe({
      next: (response) => {
        if (response.success) console.log(response.message);
        areaService.user = response.user;
      },
      error: (error) => {
        if (error.status === 404) {
          console.log('usuário não encontrado');
        }
        if (error.status === 401) {
          console.log('usuário não autorizado');
        }
        if (error.status === 500) {
          console.log('Erro na requisição');
        }
      },
    });

    store.dispatch(setUser({ payload: areaService.user }));
  }
}
