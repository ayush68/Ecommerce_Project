export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageData?: string;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  cartItems: {
    productId: number;
    quantity: number;
  }[];
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  orderId: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderDate: string;
  totalAmount: number;
  items: OrderItemResponse[];
}
