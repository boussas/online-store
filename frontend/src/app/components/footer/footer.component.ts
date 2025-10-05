import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  newsletterEmail = '';

  subscribeNewsletter() {
    if (this.isValidEmail(this.newsletterEmail)) {
      console.log('Subscribing email:', this.newsletterEmail);
      alert('Thank you for subscribing to our newsletter!');
      this.newsletterEmail = '';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
