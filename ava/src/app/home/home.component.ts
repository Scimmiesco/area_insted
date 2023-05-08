import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  ngOnInit() {
    const swiper = new Swiper('.swiper', {
      speed: 400,
      spaceBetween: 100,
    }
    )
  }
}






