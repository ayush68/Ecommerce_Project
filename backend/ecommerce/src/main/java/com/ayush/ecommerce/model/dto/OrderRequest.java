package com.ayush.ecommerce.model.dto;

import java.util.List;

public record OrderRequest(
        String customerName,
        String email,
        String shippingAddress,
        List<OrderItemRequest> items
) {
}
