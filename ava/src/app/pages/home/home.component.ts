import { TokenService } from 'app/services/token.service';
import { Component } from '@angular/core';
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
import { ResponseMateriasI } from 'app/Interfaces/materias.interface';
import { cores } from 'app/Interfaces/cores.interface';
import { EnumCargos } from 'app/Interfaces/token.interface';
import { AtividadesService } from 'app/services/atividades.service';

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
  cores = cores;

  constructor(
    public dialog: MatDialog,
    public materiasService: MateriasService,
    public userService: UserService,
    public tokenService: TokenService,
    public store: Store<{ app: IappState }>,
    private tamanhoDaTelaService: TamanhoDaTelaService,
    private router: Router,
    public atividadesService: AtividadesService
  ) {
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());
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

  navegarParaMateria(idMateria: string): void {
    this.router.navigate([`area/materia/${idMateria}`]);
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
  }

  getColor(index: number): string {
    if (index > this.cores.length - 1) {
      return this.cores[index - this.cores.length].codigoHex;
    } else {
      return this.cores[index].codigoHex;
    }
  }
}
