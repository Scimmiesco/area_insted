import { Component, Input, OnInit } from '@angular/core';

interface carouselContent {
  imgSrc: string;
  imgAlt: string;
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
