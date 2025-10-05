package com.boussas.store.service;

import com.boussas.store.dto.ProductDTO;
import com.boussas.store.mapper.ProductMapper;
import com.boussas.store.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public ProductService(ProductRepository productRepository, ProductMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

      
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

      
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }
}
