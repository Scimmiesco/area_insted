import { UserService } from './../../services/user.service';
import {
  AtividadePadrao,
  IAtividade,
  TiposAtividades,
} from './../../Interfaces/atividade.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MateriasService } from 'app/services/materias.service';
import {
  materiaPadrao,
  ResponseMateriasI,
} from 'app/Interfaces/materias.interface';
import { EnumCargos } from 'app/Interfaces/token.interface';
import { AtividadesService } from 'app/services/atividades.service';
import { AdicionarAtividadeComponent } from 'app/components/modais/atividade/adicionar-atividade/adicionar-atividade.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getUser, IappState } from 'app/store/app.state';
import { EditarAtividadeComponent } from 'app/components/modais/atividade/editar-atividade/editar-atividade.component';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materiaAtividades.component.html',
})
export class MateriaAtividadesComponent {
  idMateria: string = '';
  idUsuario!: number;
  private subscription!: Subscription;
  EnumTiposAtividades = TiposAtividades;
  acessoDocente = false as boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public materiasService: MateriasService,
    private store: Store<{ app: IappState }>,
    public userService: UserService,
    public atividadesService: AtividadesService,
    private tamanhoDaTelaService: TamanhoDaTelaService,
    public dialog: MatDialog
  ) {
    this.subscription = this.getIDMateria().subscribe((value) => {
      this.idMateria = value.toString();
    });
    userService.obterCargoUsuario().subscribe((cargo) => {
      if (cargo == EnumCargos.PROFESSOR) {
        this.acessoDocente = true;
      }
    });
    this.store.select(getUser).subscribe((user) => {
      this.idUsuario = user.IdUser;
    });this.tamanhoDaTelaService.addListener(() => this.telaMobile());
  }
  ngOnInit(): void {
    this.ObterAtividadesPorMateria();
  }
  getIDMateria(): Observable<number> {
    return this.activatedRoute.params.pipe(
      map((params) => Number(params['id']))
    );
  }
  public telaMobile(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getMateriaSelecionada(): ResponseMateriasI['materias'] {
    let materiaSelecionadoPeloID: ResponseMateriasI['materias'] = [];

    this.materiasService.materias$.subscribe((val) => {
      materiaSelecionadoPeloID.push(
        val.find((materia) => materia.IdClass == this.idMateria) ||
          materiaPadrao[0]
      );
    });

    return materiaSelecionadoPeloID;
  }

  AbrirModalAdicionarAtividade() {
    var dialogRef = this.dialog.open(AdicionarAtividadeComponent, {
      autoFocus: true,
      closeOnNavigation: true,
      data: { MateriaID: parseInt(this.idMateria), UsuarioID: this.idUsuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.atividadesService.qtdAtividadesCriadas != 0)
        window.location.reload();
    });
  }

  AbrirModalEditarAtividade(atividade: IAtividade) {
    var dialogRef = this.dialog.open(EditarAtividadeComponent, {
      autoFocus: true,
      closeOnNavigation: true,
      data: {
        Atividade: atividade,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.atividadesService.qtdAtividadesCriadas != 0)
        window.location.reload();
    });
  }
  ObterAtividadesPorMateria() {
    this.store.select(getUser).subscribe((user) => {
      this.atividadesService.ObterAtividadesPorMateria(
        this.idMateria,
        user.IdUser.toString()
      );
    });
  }
}
