import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product', err);
        this.loading = false;
      }
    });
  }

  getImageUrl(): string {
    if (this.product?.imageData) {
      return 'data:' + this.product.imageType + ';base64,' + this.product.imageData;
    }
    return this.product ? this.productService.getProductImageUrl(this.product.id) : '';
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        productId: this.product.id,
        productName: this.product.name,
        price: this.product.price,
        quantity: 1,
        imageData: this.product.imageData
      });
      this.message = 'Added to cart!';
      setTimeout(() => this.message = '', 2000);
    }
  }
}
