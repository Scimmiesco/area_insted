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
import Swiper from 'swiper';
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
  swiper!: Swiper;
  cores: any = [
    { nome: 'Verde Menta Fresco', codigoTailWind: 'rgb(144, 255, 177)' },
    { nome: 'Amarelo Sol Radiante', codigoTailWind: 'rgb(235, 235, 145)' },
    { nome: 'Rosa Lavanda Suave', codigoTailWind: 'rgb(236, 189, 238)' },
    { nome: 'Laranja Pêssego Acolhedor', codigoTailWind: 'rgb(147, 255, 143)' },
    { nome: 'Azul Céu Sereno', codigoTailWind: 'rgb(180, 234, 255)' },
    { nome: 'Laranja Tropical Vibrante', codigoTailWind: 'rgb(255, 192, 141)' },
    { nome: 'Violeta Primaveril Suave', codigoTailWind: 'rgb(199, 169, 255)' },
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

  ngOnInit() {
    this.avisos = Avisos;
    this.icons = Icons;
    this.swiper = new Swiper('.swiper', {
      // Configurações do Swiper
    });
    this.swiper.on('activeIndexChange', () => {
      console.log('slide changed');
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
    return this.cores[index].codigoTailWind;
  }
}
