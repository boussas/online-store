import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

    
  products = signal<Product[]>([]);

    
  filteredProducts = signal<Product[]>([]);

    
  categoryId = signal<number | null>(null);

  constructor() {
      
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });

      
    this.route.params.subscribe((params) => {
      this.categoryId.set(Number(params['id']));
    });

      
    effect(() => {
      const allProducts = this.products();
      const catId = this.categoryId();

      if (!catId) {
        this.filteredProducts.set([...allProducts]);
      } else {
        this.filteredProducts.set(allProducts.filter((p) => p.categoryId === catId));
      }
    });
  }
}
