import { User } from './user';
import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private tokenService: TokenService) {
    if (this.tokenService.HasToken()) {
      this.decodeJWT();
    }
  }

  private userSubject = new BehaviorSubject<User>({});

  private decodeJWT() {
    const token = this.tokenService.GetToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  GetUser() {
    return this.userSubject.asObservable();
  }

  SaveToken(token: string) {
    this.tokenService.SaveToken(token);
    this.decodeJWT();
  }
  Logout() {
    this.tokenService.DeleteToken();
    this.userSubject.next({});
  }
  Islogged() {
    return this.tokenService.HasToken();
  }
}
