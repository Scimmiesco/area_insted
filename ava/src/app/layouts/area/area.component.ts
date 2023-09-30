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

    userService.getUser();

  }
}
