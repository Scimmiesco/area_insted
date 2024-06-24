import { MateriasService } from 'app/services/materias.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { IappState, getUser, setUser } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { userResponse } from 'app/Interfaces/user.Interface';
import { environment } from 'environments/environment';
import { map, switchMap, take } from 'rxjs/operators';
import { EnumCargos } from 'app/Interfaces/token.interface';
import { Observable, of } from 'rxjs';
import { AtividadesService } from './atividades.service';
('');
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private APIURL = environment.URLAPI;

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    private atividadesService: AtividadesService,
    private materiasService: MateriasService
  ) {}

  getUserAndFetchActivities() {
    this.getUser().subscribe(
      (user) => {
        console.log('Usuário obtido:', user);
        this.atividadesService.ObterAtividadesPorUsuario(
          user.IdUser.toString()
        );
        this.materiasService.getMateriasPorUsuario(user.SnTeacher, user.IdUser);
      },
      (error) => {
        console.error('Erro ao obter usuário:', error);
      }
    );
  }

  private getUser(): Observable<Pessoa['user']> {
    let ra = this.tokenService.getDataFromToken().unique_name;
    let urlGetUserByRA = `${this.APIURL}user/get-user/${ra}`;
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const options = { headers: headers };

    return this.http.get<userResponse>(urlGetUserByRA, options).pipe(
      map((response) => {
        this.store.dispatch(setUser({ payload: response.user }));
        return response.user;
      })
    );
  }

  obterCargoUsuario(): Observable<EnumCargos> {
    return this.store.select(getUser).pipe(
      map((user) => {
        if (user.SnTeacher != null) {
          return user.SnTeacher === false
            ? EnumCargos.ALUNO
            : EnumCargos.PROFESSOR;
        } else {
          return EnumCargos.ALUNO;
        }
      })
    );
  }
}
