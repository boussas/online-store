package com.boussas.store.admin.controller;
import com.boussas.store.admin.service.AdminCategoryService;
import com.boussas.store.dto.CategoryDTO;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    public AdminCategoryController(AdminCategoryService adminCategoryService) {
        this.adminCategoryService = adminCategoryService;
    }

     
    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        return adminCategoryService.getAllCategories();
    }

     
    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO dto) {
        return adminCategoryService.createCategory(dto);
    }

     
    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        return adminCategoryService.updateCategory(id, dto);
    }

     
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        adminCategoryService.deleteCategory(id);
    }
}
