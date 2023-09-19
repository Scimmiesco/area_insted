import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';
import { IappState } from 'app/store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7003/';

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>
  ) {}
  quebraToken() {
    this.store.select('app').pipe(
      map((e) => {
        e.token;
      })
    );
  }
  getUser(ra: string): Observable<any> {
    const urlGetUserByID = `${this.apiUrl}/users/get-users/${ra}`;

    return this.store.select('app').pipe(
      map((e) => e.token),
      map((token) => {
        const headers = new HttpHeaders({
          Authorization: `${token}`,
        });
        const options = { headers: headers };

        return this.http.get<Pessoa['user']>(urlGetUserByID, options);
      })
    );
  }
}
