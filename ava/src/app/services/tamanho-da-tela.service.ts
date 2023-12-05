import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TamanhoDaTelaService {

  mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
  }

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  addListener(callback: () => void): void {
    this.mobileQuery.addEventListener('change', callback);
  }

  removeListener(callback: () => void): void {
    this.mobileQuery.removeEventListener('change', callback);
  }
}
