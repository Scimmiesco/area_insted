import { IappState } from 'app/store/app.state';
import { Component } from '@angular/core';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user$!: Observable<Pessoa['user']>;
  status: boolean = true;

  constructor(
    private router: Router,
    private store: Store<{ app: IappState }>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select('app').pipe(map((e) => e.user));
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
