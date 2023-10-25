import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovaSenha, emailResponse } from 'app/Interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordsService {
  private apiUrl = 'https://webapi20230927142946.azurewebsites.net/user';
  private userid: string = '';
  private token: string = '';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userid = params['userid'];
      this.token = params['token'];
    });
  }

  enviaEmail(tipo: string, param: string): Observable<emailResponse> {
    return this.http.get<emailResponse>(
      `${this.apiUrl}/recoverPass?tipo=${tipo}&param=${param}`
    );
  }
  trocaSenha(
    novaSenha: NovaSenha['confirmaSenhaNova']
  ): Observable<emailResponse> {
    const params = {
      userid: this.userid,
      token: this.token,
    };

    const requestBody = { novaSenha: novaSenha };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    return this.http.post<emailResponse>(
      `${this.apiUrl}/trocasenha`,
      requestBody,
      httpOptions
    );
  }
}
