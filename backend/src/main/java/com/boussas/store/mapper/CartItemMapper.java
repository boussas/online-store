package com.boussas.store.mapper;

import com.boussas.store.dto.CartItemDTO;
import com.boussas.store.model.CartItem;
import com.boussas.store.model.User;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {

      
    public CartItemDTO toDTO(CartItem cartItem) {
        if (cartItem == null) return null;

        CartItemDTO dto = new CartItemDTO();
        dto.setId(cartItem.getId());
        dto.setProductId(cartItem.getProduct().getId());
        dto.setProductTitle(cartItem.getProduct().getTitle());
        dto.setProductImageUrl(cartItem.getProduct().getImageUrl());
        dto.setProductPrice(cartItem.getProduct().getPrice());
        dto.setQuantity(cartItem.getQuantity());

        if (cartItem.getUser() != null) {
            dto.setUserId(cartItem.getUser().getId());
        }

        return dto;
    }

      
    public CartItem toEntity(CartItemDTO dto) {
        if (dto == null) return null;

        CartItem item = new CartItem();
        item.setId(dto.getId());
        item.setQuantity(dto.getQuantity());

          
        if (dto.getUserId() != null) {
            User user = new User();
            user.setId(dto.getUserId());
            item.setUser(user);
        }

          
        return item;
    }
}
