package com.boussas.store.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productTitle;
    private Double productPrice;
    private Integer quantity;
    private String productImageUrl;
    private Long userId;
}
