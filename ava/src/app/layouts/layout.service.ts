import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IappState } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { UserService } from 'app/services/getUser.service';

@Injectable({
  providedIn: 'root',
})
export class layoutService {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private store: Store<{ app: IappState }>
  ) {
    
  }
}
