import { Token } from './../Interfaces/token.interface';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResponseInterface } from 'app/pages/login/login.interface';
import { IappState, setToken } from 'app/store/app.state';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenStorage = localStorage.getItem('token') || '';

  constructor(
    private store: Store<{ app: IappState }>,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.tokenStorage, 'tokenStorage Constructor');
  }

  getToken(): string {
    console.log('get token', this.isTokenValid() && this.tokenIsNotEmpty());
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

  getDataFromToken(token?: string): Token {
    const tokenToCheck = token || this.tokenStorage; // Use o token passado por parâmetro, se disponível, senão use o token no armazenamento.
    let decodedToken = {
      email: 'string',
      exp: 0,
      iat: 0,
      nbf: 0,
      unique_name: 'string',
    } as Token;

    try {
      return (decodedToken = jwtDecode(tokenToCheck) as Token);
    } catch (error) {
      return decodedToken;
    }
  }

  isTokenValid(token?: string) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tokenToCheck = token || this.tokenStorage;

    if (tokenToCheck !== '') {
      return this.getDataFromToken(tokenToCheck).exp > currentTimestamp;
    } else {
      return false;
    }
  }
  validaTokenUrl(tokenUrl: string): boolean {
    let token = '' as string;

    console.log('validaTokenUrl():', token);
    return this.isTokenValid(tokenUrl) ? true : false;
  }

  tokenIsNotEmpty() {
    return this.tokenStorage != '';
  }
}
