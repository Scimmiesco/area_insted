import { Token } from './../Interfaces/token.interface';
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
  private tokenStorage = localStorage.getItem('token') || '' as string;

  constructor(private store: Store<{ app: IappState }>) { }

  getToken(): string {
    if (this.isTokenValid() && this.tokenIsNotEmpty()) {
      return this.tokenStorage;
    } else {
      return '';
    }
  }

  saveToken(token: ResponseInterface['token']) {
    this.setToken(token);
    this.store.dispatch(setToken({ payload: token }));
    this.setTokenOnLocalStorage();
  }

  setToken(token: string) {
    this.tokenStorage = token;
  }

  setTokenOnLocalStorage() {
    if (this.isTokenValid()) {
      localStorage.setItem('token', this.tokenStorage);
    }
  }

  getDataFromToken(): Token {
    let decodedToken = {
      email: 'string',
      exp: 0,
      iat: 0,
      nbf: 0,
      unique_name: 'string',
    } as Token;

    try {
      return (decodedToken = jwtDecode(this.tokenStorage) as Token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return decodedToken;
    }
  }

  isTokenValid() {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    console.log('chama',
      this.tokenStorage !== '' &&
      this.getDataFromToken().exp > currentTimestamp)
    return (
      this.tokenStorage !== '' &&
      this.getDataFromToken().exp > currentTimestamp
    );
  }

  tokenIsNotEmpty() {
    return this.tokenStorage != '';
  }
}
