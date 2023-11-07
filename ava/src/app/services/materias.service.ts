import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMateriasI } from 'app/Interfaces/materias.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materiasSubject: BehaviorSubject<ResponseMateriasI['materias']> =
    new BehaviorSubject<ResponseMateriasI['materias']>([]);

  materias$: Observable<ResponseMateriasI['materias']> =
    this.materiasSubject.asObservable();

  setMaterias(materias: ResponseMateriasI['materias']): void {
    this.materiasSubject.next(materias);
  }

  private apiUrl = 'https://webapi20230927142946.azurewebsites.net/user';

  constructor(private http: HttpClient) {}

  getHttpMaterias(ra: string) {
    const loginUrl = `${this.apiUrl}/GetMaterias`;
    return this.http.get<ResponseMateriasI>(loginUrl + '?ra=' + ra).subscribe({
      next: (response) => {
        this.setMaterias(response.materias);
      },
    });
  }
}
