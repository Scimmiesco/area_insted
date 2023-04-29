import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {

  }

}
