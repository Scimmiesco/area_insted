import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {
  ngOnInit() {

  }

  icons = [
    {
      src: "assets/images/icons-home/clock.png",
      alt: "icone de relógio",
      rotulo: "Horário"
    },
    {
      src: "assets/images/icons-home/financeiro.png", alt: "icone de relógio",
      rotulo: "Financeiro"
    },
    {
      src: "assets/images/icons-home/grade.png", alt: "icone de relógio",
      rotulo: "Notas"
    },
    {
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
    {
      src: "assets/images/icons-home/library.png", alt: "icone de relógio",
      rotulo: "Biblioteca"
    },
    {
      src: "assets/images/icons-home/calendar.png", alt: "icone de relógio",
      rotulo: "Calendário"
    },
    {
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
    {
      src: "assets/images/icons-home/notification.png", alt: "icone de relógio",
      rotulo: "Avisos"
    },
  ]
}






