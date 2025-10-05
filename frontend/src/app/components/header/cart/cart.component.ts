import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  @ViewChild('cartContainer') cartContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.updateHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateHeight();
  }

  updateHeight() {
    const header = document.querySelector('app-header') as HTMLElement;
    const footer = document.querySelector('footer') as HTMLElement;

    const headerHeight = header?.offsetHeight || 0;
    const footerHeight = footer?.offsetHeight || 0;

    const availableHeight = window.innerHeight - headerHeight - footerHeight;

    if (this.cartContainer) {
      this.cartContainer.nativeElement.style.minHeight = `${availableHeight}px`;
    }
  }
}
