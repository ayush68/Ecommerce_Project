import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem, OrderRequest } from '../../models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  showCheckout: boolean = false;
  customerName: string = '';
  customerEmail: string = '';
  shippingAddress: string = '';
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  get cartItems(): CartItem[] {
    return this.cartService.getCartItems();
  }

  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  placeOrder(): void {
    if (!this.customerName || !this.customerEmail || !this.shippingAddress) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.error = '';

    const orderRequest: OrderRequest = {
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      shippingAddress: this.shippingAddress,
      cartItems: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (response) => {
        this.cartService.clearCart();
        this.message = `Order #${response.orderId} placed successfully!`;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/orders']), 2000);
      },
      error: (err) => {
        this.error = 'Error placing order. Please try again.';
        this.loading = false;
      }
    });
  }
}
