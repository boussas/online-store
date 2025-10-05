package com.boussas.store.admin.service;

import com.boussas.store.dto.CategoryDTO;
import com.boussas.store.mapper.CategoryMapper;
import com.boussas.store.model.Category;
import com.boussas.store.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminCategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public AdminCategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

     
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }

     
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        return categoryMapper.toDTO(category);
    }

     
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = categoryMapper.toEntity(dto);
        Category saved = categoryRepository.save(category);
        return categoryMapper.toDTO(saved);
    }

     
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        existing.setName(dto.getName());
        Category updated = categoryRepository.save(existing);
        return categoryMapper.toDTO(updated);
    }

     
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id " + id);
        }
        categoryRepository.deleteById(id);
    }
}
