import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';

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
    company: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''] // honeypot
  });

  constructor(private fb: FormBuilder, private contact: ContactService) {}

  async submit() {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending = true;
    try {
      await this.contact.send(this.form.value as any).toPromise();
      this.done = true;
      this.form.reset();
    } catch (err: any) {
      this.errorMsg = err?.error?.error || 'Something went wrong. Please try again later.';
    } finally {
      this.sending = false;
    }
  }
}
