import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // honeypot
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  send(payload: ContactPayload): Observable<any> {
    return this.http.post(`${this.base}/contact`, payload);
  }
}
