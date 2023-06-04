import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiUrl = "https://localhost:7003/user"

  constructor(private http: HttpClient) { }

  getMaterias(ra: string): Observable<string> {

    const loginUrl = `${this.apiUrl}user/GetMaterias`;
    return this.http.post<string>(`${loginUrl}`, ra)
  }
}
