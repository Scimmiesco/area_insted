import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatDialog } from '@angular/material/dialog';
import { calendarDialogComponent } from 'app/components/modais/calendar/calendar.component';
import { HorarioDialogComponent } from 'app/components/modais/horario/horario.component';
import { MateriasService } from 'app/services/materias.service';
import { Icons } from 'app/shared/icons-home/mock-icons-home';
import { IconInterface } from 'app/shared/icons-home/icons-home.model';
import { PainelInterface } from 'app/shared/info-painel/painel-home.model';
import { Avisos } from 'app/shared/info-painel/mock-painel-home';
import { Store } from '@ngrx/store';
import { IappState } from 'app/store/app.state';
import { UserService } from 'app/services/user.service';
import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';
import { notasDialogComponent } from 'app/components/modais/notas/notas.component';
import { FinanceiroDialogComponent } from 'app/components/modais/financeiro/financeiro.component';
import { Router } from '@angular/router';
import {
  ResponseMateriasI,
  materiaPadrao,
} from 'app/Interfaces/materias.interface';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  icons!: IconInterface[];
  avisos!: PainelInterface[];
  imageLoaded: boolean = false;
  divMateriaExpandido: boolean = false;
  materias: ResponseMateriasI['materias'] = [];

  cores: any = [
    {
      nome: 'Verde Menta Fresco',
      codigoTailWind: 'rgba(144, 255, 222, 0.555)',
    },
    { nome: 'Rosa Lavanda Suave', codigoTailWind: 'rgba(214, 189, 238, 0.74)' },
    {
      nome: 'Laranja Pêssego Acolhedor',
      codigoTailWind: 'rgba(147, 255, 143, 0.61)',
    },
    { nome: 'Azul Céu Sereno', codigoTailWind: 'rgba(180, 234, 255, 0.801)' },
    {
      nome: 'Laranja Tropical Vibrante',
      codigoTailWind: 'rgba(255, 215, 141, 0.801)',
    },
  ];
  constructor(
    public dialog: MatDialog,
    public materiasService: MateriasService,
    public userService: UserService,
    public store: Store<{ app: IappState }>,
    private tamanhoDaTelaService: TamanhoDaTelaService,
    private router: Router
  ) {
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());
  }
  ngAfterViewInit() {
    // this.swiperEl = document.querySelector('#swiperMaterias');
    // this.swiperEl.addEventListener('swiper-slidechange', (event: any) => {
    //   console.log('slide changed', event);
    // });
    // console.log(this.swiperEl);
    // this.materiasService.materias$.subscribe(() => {});
  }
  ngOnInit() {
    this.avisos = Avisos;
    this.icons = Icons;

    this.materiasService.materias$.subscribe((materias) => {
      this.materias = materias;
    });
  }
  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() =>
      this.handleScreenSizeChange()
    );
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
  public handleScreenSizeChange(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }

  navegarParaMateria(): void {
    this.router.navigate(['area/materia']);
  }

  OpenModais(iconId: number) {
    switch (iconId) {
      case 1:
        this.dialog.open(HorarioDialogComponent, {
          autoFocus: false,
          closeOnNavigation: true,
        });
        break;
      case 2:
        this.dialog.open(FinanceiroDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      case 6:
        this.dialog.open(calendarDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      case 7:
        this.dialog.open(notasDialogComponent, {
          autoFocus: true,
          closeOnNavigation: true,
        });
        break;
      default:
        break;
    }
  }
  ExpandirDivMaterias(expandirDivMateria: boolean) {
    this.divMateriaExpandido = !expandirDivMateria;
    console.log(this.divMateriaExpandido);
  }

  getColor(index: number): string {
    if (index > this.cores.length - 1) {
      return this.cores[index - this.cores.length].codigoTailWind;
    } else {
      return this.cores[index].codigoTailWind;
    }
  }
}
