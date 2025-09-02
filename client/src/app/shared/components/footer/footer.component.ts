import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  email = 'ccuberop@gmail.com';
  currentYear = new Date().getFullYear(); // <- compute in TS, not in the template
}
