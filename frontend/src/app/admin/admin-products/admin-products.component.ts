import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { Product } from '../../models/product.model';
import { IconsModule } from '../../icons/icons.module';
import { Category } from '../../models/category.model';
import { ProductAdminServiceService } from '../services/product-admin-service.service';
import { CategoryAdminService } from '../services/categories-admin-service.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    CheckboxModule,
    IconsModule,
  ],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  productForm!: FormGroup;
  showDialog = signal(false);
  categories = signal<Category[]>([]);
  selectedProduct: Product | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;

  constructor(
    private productService: ProductAdminServiceService,
    private categoryService: CategoryAdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.refreshProducts();
    this.categoryService.getAll().subscribe((data) => this.categories.set(data));
    this.initForm();
  }

  getCategoryName(id: number): string {
    return this.categories().find((c) => c.id === id)?.name ?? 'Unknown';
  }

  initForm(product?: Product) {
    this.productForm = this.fb.group({
      title: [product?.title || '', Validators.required],
      price: [product?.price || 0, [Validators.required, Validators.min(0)]],
      stock: [product?.stock || 0, [Validators.required, Validators.min(0)]],
      categoryId: [product?.categoryId || 1],
      description: [product?.description || ''],
      imageUrl: [product?.imageUrl || ''],
      isActive: [product?.isActive ?? true],
    });

    this.imagePreview = product?.imageUrl
      ? product.imageUrl.startsWith('http')
        ? product.imageUrl
        : `http://localhost:8080${product.imageUrl}`
      : null;

    this.imageFile = null;
  }

  openDialog(product?: Product) {
    this.selectedProduct = product || null;
    this.initForm(product);
    this.showDialog.set(true);
  }
  saveProduct() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(formValue)], { type: 'application/json' }));

    if (this.imageFile) {
      formData.append('file', this.imageFile);
    }

    const request$ = this.selectedProduct
      ? this.productService.updateProduct(this.selectedProduct.id, formData)
      : this.productService.createProduct(formData);

    request$.subscribe(() => {
      this.refreshProducts();
      this.showDialog.set(false);
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => this.refreshProducts());
  }

  refreshProducts() {
    this.productService.getProducts().subscribe((data) => this.products.set(data));
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.productForm.patchValue({
        imageUrl: `/images/products/${this.selectedProduct?.id || 'new'}/main.jpg`,
      });
    }
  }
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:8080${imagePath}`;
  }
}
