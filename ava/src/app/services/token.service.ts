import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ResponseInterface } from 'app/pages/login/login.interface';
import { IappState, setToken } from 'app/store/app.state';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenStore = '' as string;

  constructor(private store: Store<{ app: IappState }>) { }

  getToken(): string {
    if (this.isTokenValid() && this.tokenIsNotEmpty()) {
      return this.tokenStore;
    } else {
      return '';
    }
  }

  saveToken(token: ResponseInterface['token']) {
    console.log('SaveToken:', token);
    this.setToken(token);
    this.store.dispatch(setToken({ payload: token }));

    this.setTokenOnLocalStorage();
  }

  setToken(token: string) {
    this.tokenStore = token;
  }

  setTokenOnLocalStorage() {
    if (this.isTokenValid()) {
      localStorage.setItem('token', this.tokenStore);
    }
  }

  getDataFromToken(dataType: string) {
    let dataFromToken: any;
    let expDateToken: any;
    let emailFromToken: any;
    console.log('getDataFromToken : ' + dataType);
    let decodeToken = jwtDecode(this.tokenStore) as any;

    if (this.tokenStore !== '') {
      switch (dataType) {
        case 'ra':
          return (dataFromToken = decodeToken.unique_name);
        case 'expDate':
          return (expDateToken = decodeToken.exp);
        case 'email':
          return (emailFromToken = decodeToken.email);
      }
    }
  }

  isTokenValid() {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    console.log('chama',
      this.tokenStore !== '' &&
      this.getDataFromToken('expDate') > currentTimestamp)
    return (
      this.tokenStore !== '' &&
      this.getDataFromToken('expDate') > currentTimestamp
    );
  }

  tokenIsNotEmpty() {
    return this.tokenStore != '';
  }
}
