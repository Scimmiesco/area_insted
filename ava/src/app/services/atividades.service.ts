import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  AtividadePadrao,
  IAtividade,
  IAtividadeFormulario,
  IResponseAdicionarAtividade,
  IResponseAtividades,
} from 'app/Interfaces/atividade.interface';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { RetornoRequisicaoModalComponent } from 'app/components/modais/retornoRequisicao/retornoRequisicao.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private APIURL = environment.URLAPI;
  qtdAtividadesCriadas = 0 as number;
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  private AtividadesSubject: BehaviorSubject<IAtividade[]> =
    new BehaviorSubject<IAtividade[]>(AtividadePadrao);

  atividade$: Observable<IAtividade[]> = this.AtividadesSubject.asObservable();

  setAtividades(atividades: IAtividade[]): void {
    this.AtividadesSubject.next(atividades);
  }

  setAtividadesPorUsuario(atividades: IAtividade[]): void {
    this.AtividadesPorUsuarioSubject.next(atividades);
  }

  private AtividadesPorUsuarioSubject: BehaviorSubject<IAtividade[]> =
    new BehaviorSubject<IAtividade[]>(AtividadePadrao);

  AtividadesPorUsuario$: Observable<IAtividade[]> =
    this.AtividadesPorUsuarioSubject.asObservable();

  ObterAtividadesPorMateria(materiaID: string, usuarioID: string) {

    const loginUrl = `${this.APIURL}GetAtividadesPorMateria?materiaID=${materiaID}&usuarioID=${usuarioID}`;
    this.http.get<IResponseAtividades>(loginUrl).subscribe({
      next: (response) => {
        this.setAtividades(response.atividades);
      },
      error: (error) => {},
    });
  }

  ObterAtividadesPorUsuario(usuarioID: string) {
    const loginUrl = `${this.APIURL}ObterAtividadesPorUsuario?usuarioID=${usuarioID}`;

    return this.http.get<IResponseAtividades>(loginUrl).subscribe({
      next: (response) => {
        this.setAtividadesPorUsuario(response.atividades);
      },
      error: (err) => {
        console.error('Error fetching materias:', err);
      },
    });
  }

  AdicionarAtividade(
    formData: IAtividadeFormulario
  ): Observable<IResponseAdicionarAtividade> {
    return this.http
      .post<any>(`${this.APIURL}CriarOuAdicionarAtividade`, formData)
      .pipe(
        map((response: any) => {
          this.qtdAtividadesCriadas++;
          return {
            success: response.success,
            message: response.message,
          } as IResponseAdicionarAtividade;
        }),
        catchError((error) => {
          let mensagem: string;

          if (error.status === 400) {
            mensagem =
              'Solicitação inválida: Verifique os dados do formulário para erros de validação.';
          } else if (error.status === 500) {
            mensagem =
              'Erro no servidor: Por favor, tente novamente mais tarde.';
          } else {
            mensagem =
              'Erro desconhecido. Por favor, tente novamente mais tarde.';
          }

          return of({
            success: false,
            message: mensagem,
          } as IResponseAdicionarAtividade);
        })
      );
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.APIURL}uploadArquivo`, formData, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    });
  }
}
