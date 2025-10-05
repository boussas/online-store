import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PrimaryButtonComponent } from '../../../primary-button/primary-button.component';
import { CartService } from '../../../../services/cart.service';
@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent,DecimalPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  subtotal = computed(() =>
    this.cartService.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

    
  tax = computed(() => this.subtotal() * 0.1);

    
  totalWithTax = computed(() => this.subtotal() + this.tax());
}
