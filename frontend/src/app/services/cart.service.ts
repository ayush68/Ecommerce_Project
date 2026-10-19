import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next(this.cartItems);
        this.saveCartToStorage();
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }
}
