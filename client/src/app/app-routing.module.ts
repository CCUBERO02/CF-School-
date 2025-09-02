import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'CF Solutions — Home' },
  { path: 'services', component: ServicesComponent, title: 'CF Solutions — Services' },
  { path: 'contact', component: ContactComponent, title: 'CF Solutions — Contact' },
  { path: '**', redirectTo: '' }
];

@NgModule({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], exports: [RouterModule] })
export class AppRoutingModule { }
