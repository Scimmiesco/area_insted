import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  getUserOnSystem(fieldType : string, recoverField: string) {
    return this.http.get(
      `https://localhost:7300/user/recover-password/${fieldType}/${recoverField}`
    );
  }

}
