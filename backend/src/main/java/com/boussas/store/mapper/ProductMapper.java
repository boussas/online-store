package com.boussas.store.mapper;

import com.boussas.store.dto.ProductDTO;
import com.boussas.store.model.Category;
import com.boussas.store.model.Product;
import com.boussas.store.repository.CategoryRepository;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final CategoryRepository categoryRepository;

    public ProductMapper(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ProductDTO toDTO(Product product) {
        if (product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setTitle(product.getTitle());
        dto.setImageUrl(product.getImageUrl());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());
        dto.setOriginalPrice(product.getOriginalPrice());
        dto.setFeatures(product.getFeatures());
        dto.setTags(product.getTags());
        dto.setIsActive(product.getIsActive());

        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        return dto;
    }

    public Product toEntity(ProductDTO dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.getId());
        product.setTitle(dto.getTitle());
        product.setImageUrl(dto.getImageUrl());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setRating(dto.getRating());
        product.setReviewCount(dto.getReviewCount());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setFeatures(dto.getFeatures());
        product.setTags(dto.getTags());
        product.setIsActive(dto.getIsActive());

          
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id " + dto.getCategoryId()));
            product.setCategory(category);
        }

        return product;
    }

      
    public void updateEntityFromDTO(Product product, ProductDTO dto) {
        product.setTitle(dto.getTitle());
        product.setImageUrl(dto.getImageUrl());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setRating(dto.getRating());
        product.setReviewCount(dto.getReviewCount());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setFeatures(dto.getFeatures());
        product.setTags(dto.getTags());
        product.setIsActive(dto.getIsActive());

          
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id " + dto.getCategoryId()));
            product.setCategory(category);
        }
    }
}