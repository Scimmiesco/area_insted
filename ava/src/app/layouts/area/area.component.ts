import { UserService } from 'app/services/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IappState, browseReloadToken, getUser } from 'app/store/app.state';
import { TokenService } from 'app/services/token.service';
import { MateriasService } from 'app/services/materias.service';
import { materiaPadrao } from 'app/Interfaces/materias.interface';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { MatDialog } from '@angular/material/dialog';
import { TemaService } from 'app/services/tema.service';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';
import { IconsAcessibilidadeInterface } from 'app/shared/icons-acessibilidade/icons-acessibilidade.model';
import { IconsAcessibilidade } from 'app/shared/icons-acessibilidade/mock-icons-acessibilidade';
import {
  catchError,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AtividadesService } from 'app/services/atividades.service';
import { EnumCargos } from 'app/Interfaces/token.interface';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
})
export class AreaComponent implements OnInit {
  tokenSession = localStorage.getItem('token') || '';
  icons!: IconInterface[];
  iconsAcessibilidade!: IconsAcessibilidadeInterface[];
  htmlRoot!: HTMLElement;
  tamanhoFontePadrao = '16px';
  private materiasSubscription!: Subscription;
  private unsubscribe$: Subject<void> = new Subject<void>();
  cargoUsuario!: EnumCargos;
  userID = 0 as number;

  constructor(
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private userService: UserService,
    private materiasService: MateriasService,
    public temaService: TemaService,
    private tamanhoDaTelaService: TamanhoDaTelaService,
    private atividadesService: AtividadesService
  ) {
    this.tamanhoDaTelaService.addListener(() => this.telaTamanhoMobile());
    this.icons = Icons;
    this.iconsAcessibilidade = IconsAcessibilidade;
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
  }
  ngOnInit() {
    this.htmlRoot = <HTMLElement>document.getElementsByTagName('html')[0];
    this.userService.getUserAndFetchActivities();

    this.userService.obterCargoUsuario().subscribe((cargo) => {
      this.cargoUsuario = cargo;
    });
    this.store.select(getUser).subscribe((user) => {
      this.userID = user.IdUser;
    });
    this.getMaterias();
  }

  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() => this.telaTamanhoMobile());
    if (this.materiasSubscription) {
      this.materiasSubscription.unsubscribe();
    }
  }

  getMaterias() {

  }
  ObterAtividadesPorUsuario() {
    this.store
      .pipe(
        select(getUser),
        tap((user) => {
          const usuarioID = user.IdUser;
          this.atividadesService.ObterAtividadesPorUsuario(
            usuarioID.toString()
          );
        })
      )
      .subscribe();
  }

  public telaTamanhoMobile(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }

  getTamanhoFonte(): string {
    if (this.htmlRoot != null) {
      let estiloHtml = window.getComputedStyle(this.htmlRoot);
      let tamanhoFonteAtual = estiloHtml.getPropertyValue('font-size');
      return tamanhoFonteAtual;
    }

    return this.tamanhoFontePadrao;
  }

  botoesAcessibilidade(nomeIcone: string) {
    let tamanhoFonteAtualInt = parseInt(this.getTamanhoFonte());

    switch (nomeIcone) {
      case 'aumentaTamanhoFonte':
        tamanhoFonteAtualInt++;
        this.htmlRoot.style.fontSize = `${tamanhoFonteAtualInt}px`;
        break;

      case 'tamanhoFontePadrao':
        this.htmlRoot.style.fontSize = this.tamanhoFontePadrao;
        break;

      case 'diminuiTamanhoFonte':
        tamanhoFonteAtualInt--;
        this.htmlRoot.style.fontSize = `${tamanhoFonteAtualInt}px`;
        break;

      case 'mudaContraste':
        if (localStorage.getItem('tema') === 'alto_contraste') {
          this.temaService.mudarTema('light');
        } else {
          this.temaService.mudarTema('alto_contraste');
        }

        break;

      default:
        break;
    }
  }
}
