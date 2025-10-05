package com.boussas.store.admin.service;

import com.boussas.store.dto.ProductDTO;
import com.boussas.store.mapper.ProductMapper;
import com.boussas.store.model.Product;
import com.boussas.store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public AdminProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

     
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

     
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = productMapper.toEntity(dto);
        Product saved = productRepository.save(product);
        return productMapper.toDTO(saved);
    }

     
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setStock(dto.getStock());
        existing.setRating(dto.getRating());
        existing.setOriginalPrice(dto.getOriginalPrice());
        existing.setFeatures(dto.getFeatures());
        existing.setTags(dto.getTags());
        existing.setIsActive(dto.getIsActive());
         

        Product updated = productRepository.save(existing);
        return productMapper.toDTO(updated);
    }

     
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }
    public ProductDTO saveProductImage(Long productId, MultipartFile file) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

         
        Path uploadDir = Paths.get("uploads/products/" + productId);
        Files.createDirectories(uploadDir);

         
        String filename = "main.jpg";  
        Path filePath = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

         
        product.setImageUrl("/images/products/" + productId + "/" + filename);
        Product saved = productRepository.save(product);

        return productMapper.toDTO(saved);
    }

}
