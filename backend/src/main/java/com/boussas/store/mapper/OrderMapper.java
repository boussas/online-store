package com.boussas.store.mapper;

import com.boussas.store.dto.CartItemDTO;
import com.boussas.store.dto.OrderDTO;
import com.boussas.store.model.Order;
import com.boussas.store.model.CartItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    private final CartItemMapper cartItemMapper;

    public OrderMapper(CartItemMapper cartItemMapper) {
        this.cartItemMapper = cartItemMapper;
    }

    public OrderDTO toDTO(Order order) {
        if (order == null) return null;

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());

        if (order.getItems() != null) {
            List<CartItemDTO> itemDTOs = order.getItems()
                    .stream()
                    .map(cartItemMapper::toDTO)
                    .collect(Collectors.toList());
            dto.setItems(itemDTOs);
        }

        return dto;
    }

    public Order toEntity(OrderDTO dto) {
        if (dto == null) return null;

        Order order = new Order();
        order.setId(dto.getId());
        order.setUserId(dto.getUserId());
        order.setTotalAmount(dto.getTotalAmount());
        order.setStatus(dto.getStatus());
        order.setCreatedAt(dto.getCreatedAt());
        order.setUpdatedAt(dto.getUpdatedAt());

          
        return order;
    }
}
