import { Component, effect, inject, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchService } from '../../services/search.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productService = inject(ProductService);

  products = signal<Product[]>([]);

  columnsPerRow = 5;
  maxRows = 3;
  itemsPerPage = this.maxRows * this.columnsPerRow;
  currentPage = signal(1);

  filteredProducts = signal<Product[]>([]);

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.itemsPerPage));
  currentRows = computed(() => Math.ceil(this.paginatedProducts().length / this.columnsPerRow));
  shouldShowPagination = computed(() => this.filteredProducts().length > this.itemsPerPage);

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  });

  constructor(private searchService: SearchService) {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
      this.filteredProducts.set([...data]);
    });

    effect(() => {
      const query = this.searchService.searchQuery();
      const lowerQuery = query.toLowerCase().trim();

      if (!lowerQuery) {
        this.filteredProducts.set([...this.products()]);
      } else {
        this.filteredProducts.set(
          this.products().filter((p) => p.title.toLowerCase().includes(lowerQuery))
        );
      }

      this.currentPage.set(1);
    });
  }

  getProductById(id: number) {
    return this.products().find((p) => p.id === id) ?? null;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0 });
    }
  }

  getPaginationItems(): Array<{ type: 'page' | 'ellipsis'; value?: number }> {
    const total = this.totalPages();
    const current = this.currentPage();
    const items: Array<{ type: 'page' | 'ellipsis'; value?: number }> = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        items.push({ type: 'page', value: i });
      }
    } else {
      items.push({ type: 'page', value: 1 });

      if (current <= 3) {
        items.push({ type: 'page', value: 2 });
        if (current >= 3) items.push({ type: 'page', value: 3 });
        items.push({ type: 'ellipsis' });
        items.push({ type: 'page', value: total });
      } else if (current >= total - 2) {
        items.push({ type: 'ellipsis' });
        if (current <= total - 2) items.push({ type: 'page', value: total - 2 });
        items.push({ type: 'page', value: total - 1 });
        items.push({ type: 'page', value: total });
      } else {
        items.push({ type: 'ellipsis' });
        items.push({ type: 'page', value: current });
        items.push({ type: 'ellipsis' });
        items.push({ type: 'page', value: total });
      }
    }

    return items;
  }
}
