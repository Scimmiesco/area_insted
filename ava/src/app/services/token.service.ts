import { EnumCargos, Token } from './../Interfaces/token.interface';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResponseInterface } from 'app/Interfaces/login.interface';
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
  ) {}

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

  getDataFromToken(token?: string): Token {
    const tokenDisponivel = token || this.tokenStorage;

    let tokenDecodificado = {
      unique_name: 'string',
      email: 'string',
      role: EnumCargos.ALUNO,
      nbf: 0,
      exp: 0,
      iat: 0,
    } as Token;

    try {
      return (tokenDecodificado = jwtDecode(tokenDisponivel) as Token);
    } catch (error) {
      return tokenDecodificado;
    }
  }

  isTokenValid(token?: string) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tokenDisponivel = token || this.tokenStorage;

    if (tokenDisponivel !== '') {
      return (
        this.getDataFromToken(tokenDisponivel).exp > currentTimestamp ?? true
      );
    } else {
      return false;
    }
  }
  validaTokenUrl(tokenUrl: string): boolean {
    return this.isTokenValid(tokenUrl);
  }

  tokenIsNotEmpty() {
    return this.tokenStorage != '';
  }
}
