import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from './core/services/i18n/custom-translate-loader';

export function loaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: { provide: TranslateLoader, useFactory: loaderFactory, deps: [HttpClient] }
    })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    const saved = localStorage.getItem('lang');
    const fallback = 'en';
    const browser = translate.getBrowserLang() || fallback;
    translate.use(saved || (browser.startsWith('es') ? 'es' : fallback));
  }
}
