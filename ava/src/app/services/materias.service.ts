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
    private userService: UserService
  ) {}

  ObterMaterias(usuarioID: number) {
    this.userService.obterCargoUsuario().subscribe((cargo) => {
      cargo == EnumCargos.ALUNO
        ? this.getHttpMaterias(usuarioID)
        : this.getHttpMateriasDocente(usuarioID);
    });
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
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<ResponseMateriasI>(
        `${this.APIURL}materias/getmateriasdocente?param=${usuarioID}`,
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
