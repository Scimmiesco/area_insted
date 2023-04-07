import { Injectable } from '@angular/core';
const KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  GetToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  SaveToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  DeleteToken() {
    localStorage.removeItem(KEY);
  }

  HasToken() {
    return !!this.GetToken();
  }
}
