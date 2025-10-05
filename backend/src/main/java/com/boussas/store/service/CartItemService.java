package com.boussas.store.service;

import com.boussas.store.dto.CartItemDTO;
import com.boussas.store.mapper.CartItemMapper;
import com.boussas.store.model.CartItem;
import com.boussas.store.model.Product;
import com.boussas.store.model.User;
import com.boussas.store.repository.CartItemRepository;
import com.boussas.store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final CartItemMapper cartItemMapper;

    public CartItemService(CartItemRepository cartItemRepository,
                           ProductRepository productRepository,
                           CartItemMapper cartItemMapper) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.cartItemMapper = cartItemMapper;
    }

      
    public List<CartItemDTO> getAllCartItems() {
        return cartItemRepository.findAll()
                .stream()
                .map(cartItemMapper::toDTO)
                .collect(Collectors.toList());
    }

      
    public List<CartItemDTO> getCartItemsByUser(Long userId) {
        return cartItemRepository.findByUserId(userId)
                .stream()
                .map(cartItemMapper::toDTO)
                .collect(Collectors.toList());
    }

      
    public CartItemDTO getCartItemById(Long id) {
        CartItem item = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CartItem not found with id " + id));
        return cartItemMapper.toDTO(item);
    }

      
    @Transactional
    public CartItemDTO addOrUpdateCartItem(CartItemDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id " + dto.getProductId()));

        CartItem item;

        if (dto.getId() != null) {
              
            item = cartItemRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("CartItem not found with id " + dto.getId()));
            item.setQuantity(dto.getQuantity());
        } else if (dto.getUserId() != null) {
              
            item = cartItemRepository.findByProductIdAndUserId(dto.getProductId(), dto.getUserId())
                    .orElseGet(() -> {
                        CartItem newItem = new CartItem();
                        newItem.setQuantity(0);
                        return newItem;
                    });
            item.setQuantity(item.getQuantity() + dto.getQuantity());
        } else {
              
            item = new CartItem();
            item.setQuantity(dto.getQuantity());
        }

        item.setProduct(product);

        if (dto.getUserId() != null) {
            User user = new User();
            user.setId(dto.getUserId());
            item.setUser(user);
        }

        CartItem saved = cartItemRepository.save(item);
        return cartItemMapper.toDTO(saved);
    }

      
    public void deleteCartItem(Long id) {
        if (!cartItemRepository.existsById(id)) {
            throw new RuntimeException("CartItem not found with id " + id);
        }
        cartItemRepository.deleteById(id);
    }
}
