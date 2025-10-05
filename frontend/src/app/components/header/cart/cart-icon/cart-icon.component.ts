import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../icons/icons.module';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-icon',
  imports: [RouterLink, IconsModule, CommonModule],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css',
})
export class CartIconComponent {
  cartService = inject(CartService);
   cartItemCount = computed(() => this.cartService.cart().length);
}
