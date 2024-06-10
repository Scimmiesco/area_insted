import { UserService } from './../../services/user.service';
import {
  AtividadePadrao,
  IAtividade,
  TiposAtividades,
} from './../../Interfaces/atividade.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import { MateriasService } from 'app/services/materias.service';
import {
  materiaPadrao,
  ResponseMateriasI,
} from 'app/Interfaces/materias.interface';
import { EnumCargos } from 'app/Interfaces/token.interface';
import { AtividadesService } from 'app/services/atividades.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materiaAtividades.component.html',
})
export class MateriaAtividadesComponent {
  idMateria: string = '';
  private subscription!: Subscription;
  EnumTiposAtividades = TiposAtividades;
  acessoDocente = false as boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public materiasService: MateriasService,
    public userService: UserService,
    public atividadesService: AtividadesService
  ) {
    this.subscription = this.getIDMateria().subscribe((value) => {
      this.idMateria = value.toString();
    });
    userService.obterCargoUsuario().subscribe((cargo) => {
      if (cargo == EnumCargos.PROFESSOR) {
        this.acessoDocente = true;
      }
    });
    atividadesService.ObterAtividadesPorMateria(this.idMateria);
  }

  getIDMateria(): Observable<number> {
    return this.activatedRoute.params.pipe(
      map((params) => Number(params['id']))
    );
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
}
