import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}
  private APIURL = environment.URLAPI;

  getUserOnSystem(fieldType: string, recoverField: string) {
    return this.http.get(
      `${this.APIURL}user/recover-password/${fieldType}/${recoverField}`
    );
  }
}
