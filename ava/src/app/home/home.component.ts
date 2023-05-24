import { Component } from '@angular/core';
import { Content } from 'app/components/carousel/carousel.interface'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {
  ngOnInit() {

  }
  imagens: Content[] = [
    {
      imagens: {
        imgSrc: '/assets/images/painel-infos.png',
        imgAlt: 'Teste',
      },
    },
    {
      imagens: {
        imgSrc: '/assets/images/painel-infos.png',
        imgAlt: 'Teste 2',
      },
    },
  ];
  materias: Content[] = [
    {
      materias: {
        id: 0,
        materia: "Projeto Integrador"
      }
    },
    {
      materias: {
        id: 1,
        materia: "Matemática computacional"
      }
    }
  ]
  atividades: Content[] = [
    {
      atividades:
      {
        id: 0,
        atividade: "Projeto Integrador",
        expireDate: "00:00:00 2023-05-31"
      }
    },
  ]

}






