import { IappState, getUser } from 'app/store/app.state';
import { Component } from '@angular/core';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  user!: Pessoa['user'];

  constructor(
    private router: Router,
    private store: Store<{ app: IappState }>,
    public userService: UserService
  ) {
    this.user$ = this.store.select(getUser);
    this.user$.subscribe((user) => {
      this.user = user;
    });
    console.log('user', this.user);
    this.user$.subscribe((val) => {
      console.log('User$', val);
    });
  }

  ngOnInit() {}

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
