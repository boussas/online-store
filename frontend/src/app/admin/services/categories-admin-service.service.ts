import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdminService {
  private apiUrl = 'http://localhost:8080/api/admin/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(name: string): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, { name });
  }

  update(id: number, name: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
