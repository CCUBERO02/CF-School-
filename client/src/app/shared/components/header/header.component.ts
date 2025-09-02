import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/i18n/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public lang: LanguageService) {}

  setLang(lang: 'en' | 'es') {
    this.lang.change(lang);
  }
}
