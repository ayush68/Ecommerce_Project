import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchKeyword: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
      }
    });
  }

  searchProducts(): void {
    if (this.searchKeyword.trim()) {
      this.loading = true;
      this.productService.searchProducts(this.searchKeyword).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching products', err);
          this.loading = false;
        }
      });
    } else {
      this.loadProducts();
    }
  }

  getImageUrl(product: Product): string {
    if (product.imageData) {
      return 'data:' + product.imageType + ';base64,' + product.imageData;
    }
    return this.productService.getProductImageUrl(product.id);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageData: product.imageData
    });
    this.message = `${product.name} added to cart!`;
    setTimeout(() => this.message = '', 2000);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }
}
