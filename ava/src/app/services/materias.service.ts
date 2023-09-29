import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMateriasInterface } from 'app/Interfaces/home.interface';
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

  private apiUrl = "https://webapi20230927142946.azurewebsites.net/swagger/user"

  constructor(private http: HttpClient) { }

  getHttpMaterias(ra: string): Observable<ResponseMateriasInterface> {
    const loginUrl = `${this.apiUrl}/GetMaterias`;
    console.log("get materias", ra)
    return this.http.get<ResponseMateriasInterface>(loginUrl + '?ra=' + ra);
  }
}
