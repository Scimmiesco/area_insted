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
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  icons!: IconInterface[];
  avisos!: PainelInterface[];
  imageLoaded = false;

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
          autoFocus: true,
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
}
