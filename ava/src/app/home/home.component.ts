import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {
  ngOnInit() {

  }
  content = [{
    imgSrc: "/assets/images/painel-infos.png",
    imgAlt: "Teste"
  },
  {
    imgSrc: "/assets/images/painel-infos.png",
    imgAlt: "Teste 2"
  }
  ]
}






