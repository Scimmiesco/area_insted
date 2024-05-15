import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MateriasService } from 'app/services/materias.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materiaAtividades.component.html',
})
export class MateriaAtividadesComponent {
  idMateria: number = 0;
  private subscription!: Subscription;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public materiasService: MateriasService
  ) {
    this.subscription = this.getIDMateria().subscribe((value) => {
      this.idMateria = value;
    });
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
}
