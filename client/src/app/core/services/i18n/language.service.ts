import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private t: TranslateService) {}
  get current() { return this.t.currentLang || this.t.defaultLang || 'en'; }
  change(lang: 'en' | 'es') {
    this.t.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }
}
