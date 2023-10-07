import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMateriasInterface } from 'app/Interfaces/home.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materias$: ResponseMateriasInterface['materias'] = [];

  getMaterias(): Observable<ResponseMateriasInterface['materias']> {
    return new Observable((observer) => {
      observer.next(this.materias$);
      observer.complete();
    });
  }

  setMaterias(materias: ResponseMateriasInterface['materias']): void {
    this.materias$ = materias;
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
