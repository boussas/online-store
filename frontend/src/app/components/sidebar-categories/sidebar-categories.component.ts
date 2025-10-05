import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/categories.service';

@Component({
  selector: 'app-sidebar-categories',
  standalone: true,
  imports: [CommonModule, DrawerModule, ButtonModule],
  templateUrl: './sidebar-categories.component.html',
})
export class SidebarCategoriesComponent implements OnInit {
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  visible = false;

    
  categories = signal<Category[]>([]);

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }

  openDrawer() {
    this.visible = true;
  }

  closeDrawer() {
    this.visible = false;
  }

  goToCategory(id: number) {
    this.router.navigate(['/category', id]);
    this.closeDrawer();
  }
}
