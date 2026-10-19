import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  getProductImageUrl(productId: number): string {
    return `${this.apiUrl}/product/${productId}/image`;
  }

  addProduct(product: Product, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.post<Product>(`${this.apiUrl}/product`, formData);
  }

  updateProduct(id: number, product: Product, imageFile?: File): Observable<string> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.put(`${this.apiUrl}/product/${id}`, formData, { responseType: 'text' });
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/product/${id}`, { responseType: 'text' });
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/search?keyword=${keyword}`);
  }
}
