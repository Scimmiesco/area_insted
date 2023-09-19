import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState } from 'app/store/app.state';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokenStore!: string;
  decodeToken!: any;

  constructor(private store: Store<{ app: IappState }>) {
    this.store.select('app').pipe(
      map((e) => {
        this.tokenStore = e.token;
      })
    );

    this.decodeToken = jwtDecode(this.tokenStore);
  }

  getDataFromToken(dataType : string) {
    let dataFromToken : any;
    switch(dataType){
case 'ra'
    dataFromToken = this.decodeToken.unique_name;
    break;
  }}
  return dataFromToken
}
