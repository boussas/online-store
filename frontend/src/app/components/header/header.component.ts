import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CartIconComponent } from './cart/cart-icon/cart-icon.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from "./user/user.component";

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    IconsModule,
    CommonModule,
    CartIconComponent,
    SearchBarComponent,
    NavComponent,
    UserComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartService = inject(CartService);
  title = signal('Online Store');
  cartLabel = computed(() => `Cart (${this.cartService.cart().length})`);
}
