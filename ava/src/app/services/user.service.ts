import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { IappState, getUser, setUser } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { userResponse } from 'app/Interfaces/user.Interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://webapi20230927142946.azurewebsites.net/';

  userDefault!: Pessoa['user'];
  userSubject: BehaviorSubject<Pessoa['user']> = new BehaviorSubject<
    Pessoa['user']
  >(this.userDefault);
  user$: Observable<Pessoa['user']> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService
  ) {
    store.select(getUser);
  }

  getUser() {
    let ra = this.tokenService.getDataFromToken().unique_name;
    let urlGetUserByRA = `${this.apiUrl}user/get-user/${ra}`;
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const options = { headers: headers };

    this.http.get<userResponse>(urlGetUserByRA, options).subscribe({
      next: (response) => {
        this.setUserInStore(response.user);
      },
      error: (error) => {},
    });
  }

  setUserInStore(user: Pessoa['user']) {
    this.store.dispatch(setUser({ payload: user }));
  }
}
