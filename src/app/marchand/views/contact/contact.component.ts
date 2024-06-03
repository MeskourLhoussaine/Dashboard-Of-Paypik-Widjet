import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailserviceService } from '../../services/emailservice.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailserviceService: EmailserviceService) {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      nom: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { subject, nom, message } = this.contactForm.value;
      this.emailserviceService.sendEmail(subject, nom, message)
        .subscribe(
          response => {
            this.contactForm.reset();
            console.log('Email sent successfully:', response);
          },
          error => {
            // Handle error response (e.g., show error message)
            console.error('Failed to send email:', error);
          }
        );
    } else {
      // Form is invalid, do something (e.g., show error message)
    }
  }
}
