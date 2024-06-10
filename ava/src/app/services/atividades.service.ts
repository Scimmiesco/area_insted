import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  AtividadePadrao,
  IAtividade,
  IResponseAtividades,
} from 'app/Interfaces/atividade.interface';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private sessionStorageKey = 'isAuthenticated';
  private APIURL = environment.URLAPI;

  constructor(private http: HttpClient) {}

  private AtividadesSubject: BehaviorSubject<IAtividade[]> =
    new BehaviorSubject<IAtividade[]>(AtividadePadrao);

  atividade$: Observable<IAtividade[]> = this.AtividadesSubject.asObservable();

  setAtividades(atividades: IAtividade[]): void {
    this.AtividadesSubject.next(atividades);
  }
  ObterAtividadesPorMateria(idMateria: string) {
    const loginUrl = `${this.APIURL}GetAtividadesPorMateria?materiaID=${idMateria}`;

    return this.http.get<IResponseAtividades>(loginUrl).subscribe({
      next: (response) => {
        this.setAtividades(response.atividades);
        console.log(response)
      },
      error: (err) => {
        console.error('Error fetching materias:', err);
      },
    });
  }
}
