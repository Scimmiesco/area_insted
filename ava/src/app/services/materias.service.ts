import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseMateriasInterface } from 'app/Interfaces/home.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = "https://webapi20230927142946.azurewebsites.net/user";
  private materiasSubject$: BehaviorSubject<ResponseMateriasInterface["materias"]> = new BehaviorSubject<ResponseMateriasInterface["materias"]>([]);

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<ResponseMateriasInterface["materias"]> {
    console.log('get materiasOB', this.materiasSubject$.asObservable())
    return this.materiasSubject$.asObservable();
  }

  getHttpMaterias(ra: string) {
    const loginUrl = `${this.apiUrl}/GetMaterias`;
    console.log("get materias", ra)
    this.http.get<ResponseMateriasInterface>(loginUrl + '?ra=' + ra).subscribe({
      next: (response) => {
        this.materiasSubject$.next(response.materias);
      }
    });
  }
}
