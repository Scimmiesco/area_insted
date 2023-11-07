import { IappState, getUser } from 'app/store/app.state';
import { Component } from '@angular/core';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user$!: Observable<Pessoa['user']>;
  status: boolean = true;

  constructor(
    private router: Router,
    private store: Store<{ app: IappState }>,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(getUser);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
