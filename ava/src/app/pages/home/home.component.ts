import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatDialog } from '@angular/material/dialog';
import { calendarDialogComponent } from 'app/components/modais/calendar/calendar.component';
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {
  ngOnInit() {

  }
  constructor(public dialog: MatDialog) { }

  onItemClick(icon: any) {

    if (icon.id === 6) {
      this.dialog.open(calendarDialogComponent, {
        data: {
          animal: 'panda',
        }
      }
      )
    }
  }
  icons = [
    {
      id: 1,
      src: "assets/images/icons-home/clock.png",
      alt: "icone de relógio",
      rotulo: "Horário"
    },
    {
      id: 2,
      src: "assets/images/icons-home/financeiro.png", alt: "icone de relógio",
      rotulo: "Financeiro"
    },
    {
      id: 3,
      src: "assets/images/icons-home/grade.png", alt: "icone de relógio",
      rotulo: "Notas"
    },
    {
      id: 4,
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
    {
      id: 5,
      src: "assets/images/icons-home/library.png", alt: "icone de relógio",
      rotulo: "Biblioteca"
    },
    {
      id: 6,
      src: "assets/images/icons-home/calendar.png", alt: "Calendário",
      rotulo: "Calendário"
    },
    {
      id: 7,
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
    {
      id: 8,
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
  ]
}






