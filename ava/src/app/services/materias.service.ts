import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiUrl = "https://localhost:7003/"

  constructor(private http: HttpClient) { }

  auth(ra: string): Observable<string> {
    
    const loginUrl = `${this.apiUrl}user/auth`;
    return this.http.post<ResponseInterface>(`${loginUrl}`, json)
  }
}
