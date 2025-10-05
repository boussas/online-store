package com.boussas.store.service;

import com.boussas.store.dto.OrderDTO;
import com.boussas.store.mapper.CartItemMapper;
import com.boussas.store.mapper.OrderMapper;
import com.boussas.store.model.CartItem;
import com.boussas.store.model.Order;
import com.boussas.store.model.Product;
import com.boussas.store.repository.OrderRepository;
import com.boussas.store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final CartItemMapper cartItemMapper;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        OrderMapper orderMapper,
                        CartItemMapper cartItemMapper) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderMapper = orderMapper;
        this.cartItemMapper = cartItemMapper;
    }

      
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

      
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
        return orderMapper.toDTO(order);
    }

      
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = orderMapper.toEntity(orderDTO);

          
        List<CartItem> items = orderDTO.getItems().stream().map(itemDTO -> {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id " + itemDTO.getProductId()));
            CartItem cartItem = cartItemMapper.toEntity(itemDTO);
            cartItem.setProduct(product);
            return cartItem;
        }).collect(Collectors.toList());

        order.setItems(items);

          
        double totalAmount = items.stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDTO(savedOrder);
    }
}
