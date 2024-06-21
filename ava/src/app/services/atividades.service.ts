import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  AtividadePadrao,
  IAtividade,
  IAtividadeFormulario,
  IResponseAtividades,
} from 'app/Interfaces/atividade.interface';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { RetornoRequisicaoModalComponent } from 'app/components/modais/retornoRequisicao/retornoRequisicao.component';
import { MatDialog } from '@angular/material/dialog';
interface IResponseAdicionarAtividade {
  sucesso: boolean;
  mensagem: string;
}
@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private sessionStorageKey = 'isAuthenticated';
  private APIURL = environment.URLAPI;
  qtdAtividadesCriadas = 0 as number;
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  private AtividadesSubject: BehaviorSubject<IAtividade[]> =
    new BehaviorSubject<IAtividade[]>(AtividadePadrao);

  atividade$: Observable<IAtividade[]> = this.AtividadesSubject.asObservable();

  setAtividades(atividades: IAtividade[]): void {
    this.AtividadesSubject.next(atividades);
  }
  ObterAtividadesPorMateria(idMateria: string) {
    const loginUrl = `${this.APIURL}GetAtividadesPorMateria?materiaID=${idMateria}`;

    return this.http.get<IResponseAtividades>(loginUrl).subscribe({
      next: (response) => {
        this.setAtividades(response.atividades);
        console.log(response);
      },
      error: (err) => {
        console.error('Error fetching materias:', err);
      },
    });
  }

  AdicionarAtividade(
    formData: IAtividadeFormulario
  ): Observable<IResponseAdicionarAtividade> {
    return this.http.post(`${this.APIURL}AdicionarAtividade`, formData).pipe(
      tap({
        next: (response: any) => {
          this.qtdAtividadesCriadas++;
          return { sucesso: true, mensagem: 'Matéria adicionada com sucesso' };
        },
        error: (error) => {
          if (error.status === 400) {
            return {
              sucesso: false,
              mensagem:
                'Solicitação inválida: Verifique os dados do formulário para erros de validação.',
            };
          } else if (error.status === 500) {
            return {
              sucesso: false,
              mensagem:
                'Erro no servidor: Por favor, tente novamente mais tarde.',
            };
          }
          return {
            sucesso: false,
            mensagem:
              'Erro desconhecido. Por favor, tente novamente mais tarde.',
          };
        },
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
