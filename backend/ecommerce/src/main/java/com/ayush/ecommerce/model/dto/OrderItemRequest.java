package com.ayush.ecommerce.model.dto;

public record OrderItemRequest(
        int productId,
        int quantity
) {}
