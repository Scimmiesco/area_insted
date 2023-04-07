import { Directive, ElementRef, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputRestriction]',
})
export class InputRestrictionDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = <KeyboardEvent>event;
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'Shift',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];

    const isAllowedKey = allowedKeys.includes(event.key);

    const isNumericKey =
      (event.key >= '0' && event.key <= '9') ||
      (event.key >= 'numpad0' && event.key <= 'numpad9');

    if (!isAllowedKey && !isNumericKey) {
      event.preventDefault();
    }
  }
}
