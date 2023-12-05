import { UserService } from 'app/services/user.service';
import {
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, browseReloadToken } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { MateriasService } from 'app/services/materias.service';
import { materiaPadrao } from 'app/Interfaces/materias.interface';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { MatDialog } from '@angular/material/dialog';
import { TemaService } from 'app/services/tema.service';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent {
  tokenSession = localStorage.getItem('token') || '';
  icons!: IconInterface[];

  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private userService: UserService,
    private materiasService: MateriasService,
    public temaService: TemaService,
    private tamanhoDaTelaService: TamanhoDaTelaService
  ) {
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());

    this.icons = Icons;
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    this.getDados();
  }
  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() =>
      this.handleScreenSizeChange()
    );
  }
  getDados() {
    this.getUser();
    this.getMaterias();
  }

  getMaterias() {
    let ra = this.tokenService.getDataFromToken().unique_name;

    this.materiasService.materias$.subscribe((materias) => {
      if (
        materias === null ||
        materias.length === 0 ||
        materias === materiaPadrao
      ) {
        this.materiasService.getHttpMaterias(ra);
      }
    });
  }

  getUser() {
    this.userService.getUser();
  }

  public handleScreenSizeChange(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }
}
