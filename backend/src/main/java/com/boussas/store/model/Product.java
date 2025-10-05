package com.boussas.store.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double price;
    private Integer stock;
    private Double rating;
    private Integer reviewCount;
    private Double originalPrice;

    @ElementCollection
    private List<String> features;

    @ElementCollection
    private List<String> tags;

    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
