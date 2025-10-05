package com.boussas.store.admin.controller;
import com.boussas.store.admin.service.AdminProductService;
import com.boussas.store.dto.ProductDTO;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/product")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return adminProductService.getAllProducts();
    }

    @PostMapping
    public ProductDTO createProduct(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        ProductDTO savedProduct = adminProductService.createProduct(productDTO);
        if (file != null) {
            savedProduct = adminProductService.saveProductImage(savedProduct.getId(), file);
        }
        return savedProduct;
    }

    /* PUT /api/admin/product/{id}
    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto){
    return adminProductService.updateProduct(id, dto);
     */
    @PutMapping("/{id}")
    public ProductDTO updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        ProductDTO updatedProduct = adminProductService.updateProduct(id, productDTO);
        if (file != null) {
            updatedProduct = adminProductService.saveProductImage(id, file);
        }

        return updatedProduct;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        adminProductService.deleteProduct(id);
    }
}
