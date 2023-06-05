import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMateriasInterface } from 'app/pages/home/home.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private materias: ResponseMateriasInterface["materias"] = [];

  getMaterias(): ResponseMateriasInterface["materias"] {
    return this.materias;
  }

  setMaterias(materias: ResponseMateriasInterface["materias"]): void {
    this.materias = materias;
  }

  private apiUrl = "https://localhost:7003/user"

  constructor(private http: HttpClient) { }

  getHttpMaterias(ra: string): Observable<ResponseMateriasInterface> {
    const loginUrl = `${this.apiUrl}/GetMaterias`;
    return this.http.get<ResponseMateriasInterface>(loginUrl + '?ra=' + ra);
  }
}
