package com.boussas.store.repository;

import com.boussas.store.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByProductIdAndUserId(Long productId, Long userId);
    List<CartItem> findByUserId(Long userId);
}
