package com.boussas.store.controller;

import com.boussas.store.dto.CartItemDTO;
import com.boussas.store.service.CartItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

     
    @GetMapping
    public List<CartItemDTO> getAllCartItems(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return cartItemService.getCartItemsByUser(userId);
        }
        return cartItemService.getAllCartItems();
    }

     
    @PostMapping
    public CartItemDTO addOrUpdateCartItem(@RequestBody CartItemDTO dto) {
        return cartItemService.addOrUpdateCartItem(dto);
    }

     
    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
    }
}
