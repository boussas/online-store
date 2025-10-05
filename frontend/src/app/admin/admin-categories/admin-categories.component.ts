import { Component, ViewChild, signal, OnInit } from '@angular/core';
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
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { Category } from '../../models/category.model';
import { CategoryAdminService } from '../services/categories-admin-service.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FontAwesomeModule,
  ],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrash = faTrash;

  categoryForm!: FormGroup;
  showDialog = signal(false);
  selectedCategory: Category | null = null;

  categories = signal<Category[]>([]);

  constructor(private fb: FormBuilder, private categoryService: CategoryAdminService) {}

  ngOnInit() {
    this.initForm();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }

  initForm(category?: Category) {
    this.categoryForm = this.fb.group({
      name: [category?.name || '', Validators.required],
    });
  }

  openDialog(category?: Category) {
    this.selectedCategory = category || null;
    this.initForm(category);
    this.showDialog.set(true);
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    const { name } = this.categoryForm.value;

    if (this.selectedCategory) {
      this.categoryService.update(this.selectedCategory.id, name).subscribe(() => {
        this.loadCategories();
      });
    } else {
      this.categoryService.create(name).subscribe(() => {
        this.loadCategories();
      });
    }

    this.showDialog.set(false);
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    });
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }
}
