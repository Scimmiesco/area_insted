import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {Component, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-materia',
  templateUrl: './materiaAtividades.component.html',
})
export class MateriaAtividadesComponent {

  constructor(
    public router: Router,
    public activatedRoute : ActivatedRoute)
  {

    this.getIDMateria().subscribe((value)=>{

    });
  }

  getIDMateria(): Observable<string> {
    let idMateria : Observable<string>;
    idMateria = this.activatedRoute.params.pipe(map((p) => p['id']));
    return idMateria;
  }

}
