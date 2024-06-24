import { UserService } from 'app/services/user.service';
import { TokenService } from 'app/services/token.service';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResponseMateriasI,
  materiaPadrao,
} from 'app/Interfaces/materias.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumCargos } from 'app/Interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materiasSubject: BehaviorSubject<ResponseMateriasI['materias']> =
    new BehaviorSubject<ResponseMateriasI['materias']>(materiaPadrao);

  materias$: Observable<ResponseMateriasI['materias']> =
    this.materiasSubject.asObservable();

  setMaterias(materias: ResponseMateriasI['materias']): void {
    this.materiasSubject.next(materias);
  }

  private APIURL = environment.URLAPI;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  getMateriasPorUsuario(acessoDocente: boolean, usuarioID: number) {
    if (acessoDocente) {
      this.getHttpMateriasDocente(usuarioID);
    } else {
      this.getHttpMaterias(usuarioID);
    }
  }

  getHttpMaterias(usuarioID: number) {
    return this.http
      .get<ResponseMateriasI>(
        `${this.APIURL}materias/getmaterias?usuarioID=${usuarioID}`
      )
      .subscribe({
        next: (response) => {
          this.setMaterias(response.materias);
        },
      });
  }

  getHttpMateriasDocente(usuarioID: number) {
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http
      .get<ResponseMateriasI>(
        `${this.APIURL}materias/getmateriasdocente?usuarioID=${usuarioID}`,
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.setMaterias(response.materias);
        },
        error: (err) => {
          console.error('Error fetching materias:', err);
        },
      });
  }
}
