import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResponseMateriasI,
  materiaPadrao,
} from 'app/Interfaces/materias.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getHttpMaterias(ra: string) {
    return this.http
      .get<ResponseMateriasI>(`${this.APIURL}materias/getmaterias?ra=${ra}`)
      .subscribe({
        next: (response) => {
          this.setMaterias(response.materias);
        },
      });
  }
}
