import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CartComponent } from './components/header/cart/cart.component';
import { UserLayoutComponent } from './layouts/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminRoleGuard } from './services/admin-role-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'category/:id', component: CategoryProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminRoleGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },

      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'customers', component: AdminCustomersComponent },
      { path: 'settings', component: AdminSettingsComponent },
      { path: '', component: AdminDashboardComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
