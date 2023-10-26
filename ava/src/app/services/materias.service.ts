import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMateriasInterface } from 'app/Interfaces/home.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materiasSubject: BehaviorSubject<
    ResponseMateriasInterface['materias']
  > = new BehaviorSubject<ResponseMateriasInterface['materias']>([]);

  materias$: Observable<ResponseMateriasInterface['materias']> =
    this.materiasSubject.asObservable();

  setMaterias(materias: ResponseMateriasInterface['materias']): void {
    this.materiasSubject.next(materias);
  }

  private apiUrl = 'https://webapi20230927142946.azurewebsites.net/user';

  constructor(private http: HttpClient) {}

  getHttpMaterias(ra: string) {
    const loginUrl = `${this.apiUrl}/GetMaterias`;
    return this.http
      .get<ResponseMateriasInterface>(loginUrl + '?ra=' + ra)
      .subscribe({
        next: (response) => {
          this.setMaterias(response.materias);
        },
      });
  }
}
