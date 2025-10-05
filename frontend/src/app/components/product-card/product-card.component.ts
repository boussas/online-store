import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../icons/icons.module';
import { Router } from '@angular/router';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, CommonModule, IconsModule, ProductRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  cartService = inject(CartService);
  router = inject(Router);
  quantity = computed(() => this.cartService.getQuantity(this.product()));
  goToDetails() {
    this.router.navigate(['/product', this.product().id]);
  }
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:8080${imagePath}`;
  }
}
