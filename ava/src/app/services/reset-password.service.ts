import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface enviaEmailInterface {
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordsService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://localhost:7003/user/recoverPass';

  enviaEmail(tipo: string, param: string): Observable<enviaEmailInterface> {
    console.log('enviaEmailHttp');
    return this.http.get<enviaEmailInterface>(
      `${this.url}?tipo=${tipo}&param=${param}`
    );
  }
}
