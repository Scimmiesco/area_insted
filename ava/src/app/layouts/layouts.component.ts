import { UserService } from 'app/services/getUser.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IappState,
  browseReload,
  setIsAuthenticated,
  setToken,
  setUser,
} from 'app/store/app.state';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent {
  userSession!: Pessoa['user'];
  userSessionData = sessionStorage.getItem('user');
  isAuthenticatedData = sessionStorage.getItem('isAuthenticated');

  constructor(store: Store<{ app: IappState }>, userService: UserService) {
    if (this.userSessionData) {
      this.userSession = JSON.parse(this.userSessionData);
    }

    if (sessionStorage.getItem('user') && this.isAuthenticatedData != null) {
      const isAuthenticated = parseInt(this.isAuthenticatedData);

      store.dispatch(browseReload({ payload: this.userSession }));
      store.dispatch(setIsAuthenticated({ payload: isAuthenticated }));
      userService.getUser(this.userSession.nrRegister);
      // this.store.setUser({app: this})
    }
  }
}
