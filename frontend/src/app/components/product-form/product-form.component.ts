import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    brand: '',
    price: 0,
    category: '',
    releaseDate: '',
    productAvailable: true,
    stockQuantity: 0
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isEditMode: boolean = false;
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        if (data.imageData) {
          this.imagePreview = 'data:' + data.imageType + ';base64,' + data.imageData;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading product';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.message = '';

    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product, this.selectedFile || undefined).subscribe({
        next: () => {
          this.message = 'Product updated successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/products']), 1500);
        },
        error: (err) => {
          this.error = 'Error updating product';
          this.loading = false;
        }
      });
    } else {
      this.productService.addProduct(this.product, this.selectedFile || undefined).subscribe({
        next: () => {
          this.message = 'Product added successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/products']), 1500);
        },
        error: (err) => {
          this.error = 'Error adding product';
          this.loading = false;
        }
      });
    }
  }
}
