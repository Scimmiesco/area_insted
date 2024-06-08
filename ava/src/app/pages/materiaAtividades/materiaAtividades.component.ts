import { TiposAtividades } from './../../Interfaces/atividade.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MateriasService } from 'app/services/materias.service';
import {
  materiaPadrao,
  ResponseMateriasI,
} from 'app/Interfaces/materias.interface';

@Component({
  selector: 'app-materia',
  templateUrl: './materiaAtividades.component.html',
})
export class MateriaAtividadesComponent {
  idMateria: string = '';
  private subscription!: Subscription;
  EnumTiposAtividades = TiposAtividades;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public materiasService: MateriasService
  ) {
    this.subscription = this.getIDMateria().subscribe((value) => {
      this.idMateria = value.toString();
    });
    console.log(this.getMateriaSelecionada());
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

  getMateriaSelecionada(): Observable<any> {
    return this.materiasService.materias$.pipe(
      map(
        (materias) =>
          materias.find((materia) => materia.IdClass === this.idMateria) ??
          materiaPadrao
      )
    );
  }
}
