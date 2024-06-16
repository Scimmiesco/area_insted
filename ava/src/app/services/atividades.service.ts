import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  AtividadePadrao,
  IAtividade,
  IAtividadeFormulario,
  IResponseAtividades,
} from 'app/Interfaces/atividade.interface';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private sessionStorageKey = 'isAuthenticated';
  private APIURL = environment.URLAPI;

  constructor(private http: HttpClient) {}

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

  AdicionarAtividade(formData: IAtividadeFormulario) {

    this.http.post(`${this.APIURL}AdicionarAtividade`, formData).subscribe({
      next: (response: any) => {
        console.log('Activity added successfully!', response);
        // Handle successful response (e.g., clear form, redirect)
        // You can access the response data here, for example:
        // const activityId = response.id; // Assuming the response contains an ID
      },
      error: (error) => {
        console.error('Error adding activity:', error);
        // Handle errors gracefully (e.g., display error message to user)
        // You can check for specific errors and provide informative messages:
        if (error.status === 400) {
          console.error('Bad request: Check form data for validation errors.');
          // Display a message to the user indicating validation issues
        } else if (error.status === 500) {
          console.error('Internal server error: Contact administrator.');
          // Display a generic error message to the user
        } else {
          console.error('Unexpected error:', error);
          // Handle other unexpected errors
        }
      },
      complete: () => {
        console.log('HTTP request completed.');
        // Perform any actions after the request finishes, regardless of success or failure
      },
    });
  }
}
