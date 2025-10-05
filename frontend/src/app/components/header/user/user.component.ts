import { Component } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-user',
  imports: [IconsModule, RouterLink, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(public authService: AuthService, public cartService: CartService) {}

  getInitials(): string {
    const name = this.authService.getUserName();
    if (!name) return '';
    const parts = name.split(' ');
    const firstInitial = parts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = parts[1]?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial;
  }

  logout() {
    this.authService.logout();
  }
}
