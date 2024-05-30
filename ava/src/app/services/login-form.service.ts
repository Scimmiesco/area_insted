import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReCaptchaTheme } from 'app/Interfaces/recaptcha.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  public tema: ReCaptchaTheme = ReCaptchaTheme.Light;

  constructor() {
    const temaLocalStorage = localStorage.getItem(
      'theme'
    ) as ReCaptchaTheme | null;

    if (temaLocalStorage != null) {
      this.tema = temaLocalStorage;
    }
  }
}
