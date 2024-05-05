import { UserService } from 'app/services/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { IconsAcessibilidadeInterface } from 'app/shared/icons-acessibilidade/icons-acessibilidade.model';
import { IconsAcessibilidade } from 'app/shared/icons-acessibilidade/mock-icons-acessibilidade';

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

  constructor(
    store: Store<{ app: IappState }>,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private userService: UserService,
    private materiasService: MateriasService,
    public temaService: TemaService,
    private tamanhoDaTelaService: TamanhoDaTelaService
  ) {
    this.tamanhoDaTelaService.addListener(() => this.telaTamanhoMobile());
    this.icons = Icons;
    this.iconsAcessibilidade = IconsAcessibilidade;
    store.dispatch(browseReloadToken({ payload: this.tokenSession }));
    this.getDados();
  }
  ngOnInit() {
    this.htmlRoot = <HTMLElement>document.getElementsByTagName('html')[0];
  }
  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() => this.telaTamanhoMobile());
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
        this.temaService.mudarTema('alto_contraste');
        break;

      default:
        // Caso o nomeIcone não corresponda a nenhum caso, faça algo aqui
        break;
    }
  }
}
