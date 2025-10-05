package com.boussas.store.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String title;
    private String imageUrl;
    private String description;
    private Double price;
    private Integer stock;
    private Double rating;
    private Integer reviewCount;
    private Double originalPrice;
    private List<String> features;
    private List<String> tags;
    private Boolean isActive;
    private Long categoryId;
    private String categoryName;
}
