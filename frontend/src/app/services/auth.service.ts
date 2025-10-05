import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

interface LoginResponse {
  token: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private cartService!: CartService;

  constructor(private http: HttpClient, private router: Router, private injector: Injector) {}

  private getCartService(): CartService {
    if (!this.cartService) {
      this.cartService = this.injector.get(CartService);
    }
    return this.cartService;
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userRole', res.role);
          localStorage.setItem('userEmail', res.email);
          localStorage.setItem('userName', `${res.firstName} ${res.lastName}`);
          localStorage.setItem('userId', res.id.toString());
        }
      })
    );
  }
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }
}
