package com.ayush.ecommerce.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayush.ecommerce.model.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {
    Optional<Order> findByOrderId(String orderId);
}