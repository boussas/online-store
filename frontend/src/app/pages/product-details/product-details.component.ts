import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { IconsModule } from '../../icons/icons.module';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [IconsModule, PrimaryButtonComponent, CommonModule, ProductRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  router = inject(Router);

  product = signal<Product | null>(null);
  randomProducts = signal<Product[]>([]);

  quantity = computed(() => {
    const p = this.product();
    return p ? this.cartService.getQuantity(p) : 0;
  });

  ngOnInit(): void {
    this.productService.getProducts().subscribe((allProducts) => {
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));

        this.productService.getProductById(id).subscribe((currentProduct) => {
          this.product.set(currentProduct);

          if (currentProduct) {
            const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id);
            const shuffled = otherProducts.sort(() => Math.random() - 0.5).slice(0, 8);
            this.randomProducts.set(shuffled);
          }
        });
      });
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:8080${imagePath}`;
  }
}
