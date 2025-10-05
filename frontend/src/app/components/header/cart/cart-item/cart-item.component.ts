import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IconsModule } from '../../../../icons/icons.module';
import { CartService } from '../../../../services/cart.service';
import { CartItem } from '../../../../models/cart-item.model';
@Component({
  selector: 'app-cart-item',
  imports: [IconsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);
  router = inject(Router);

  goToDetails() {
    this.router.navigate(['/product', this.item().product.id]);
  }
}
