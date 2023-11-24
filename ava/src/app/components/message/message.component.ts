import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() class: string = '';
  @Input() erro: string = '';

  constructor() {}

  ngOnInit() {}
}
