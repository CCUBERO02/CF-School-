import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { lastValueFrom } from 'rxjs';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  breed?: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  sending = false;
  done = false;
  errorMsg = '';

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],   // lo usamos como "Raza" en el HTML
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: ['']    // honeypot
  });

  constructor(private fb: FormBuilder, private contact: ContactService) {}

  async submit() {
    this.errorMsg = '';
    this.done = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Anti-bot: si el honeypot trae algo, simulamos éxito silencioso
    if (this.form.value.website) {
      this.done = true;
      this.form.reset();
      return;
    }

    this.sending = true;
    try {
      const payload: ContactPayload = {
      name: (this.form.value.name ?? '').trim(),
      email: (this.form.value.email ?? '').trim(),
      message: (this.form.value.message ?? '').trim(),
      // 'company' en el form se usa como 'breed' para no tocar estructura
      breed: ((this.form.value.company ?? '').trim()) || undefined
    };

      const res: any = await lastValueFrom(this.contact.send(payload));


      

      if (res?.ok) {
        this.done = true;
        this.form.reset();
      } else {
        this.errorMsg = res?.message || 'No se pudo enviar el mensaje.';
      }
    } catch (err: any) {
      // <<— AQUÍ estaba el problema: leer "message" y no "error"
      this.errorMsg =
        err?.error?.message ||
        err?.message ||
        'Something went wrong. Please try again later.';
    } finally {
      this.sending = false;
    }
  }
}
