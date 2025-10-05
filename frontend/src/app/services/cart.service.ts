import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([]);

  addToCart(product: Product) {
    const existing = this.cart().find((item) => item.product.id === product.id);

    if (existing) {
      this.cart.set(
        this.cart().map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cart.set([...this.cart(), { product, quantity: 1 }]);
    }
  }

  decreaseQuantity(product: Product) {
    const updated = this.cart()
      .map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    this.cart.set(updated);
  }

  removeFromCart(product: Product) {
    this.cart.set(this.cart().filter((item) => item.product.id !== product.id));
  }

  getQuantity(product: Product): number {
    return this.cart().find((item) => item.product.id === product.id)?.quantity || 0;
  }
}
