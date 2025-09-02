import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('✅ Angular app is running. Try: http://localhost:4200');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
