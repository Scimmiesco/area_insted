import { Component, Input, OnInit } from '@angular/core';
import { Content } from './carousel.interface'

interface carouselContent {
  imagens?: Content["imagens"],
  materias?: Content["materias"],
  atividades?: Content["atividades"],

}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() content: carouselContent[] = [];
  @Input() indicators = true;
  selectedIndex = 0;

  constructor() { }

  ngOnInit() {
  }
  selectImage(index: number): void {
    this.selectedIndex = index;
  }
}
