package com.boussas.store.admin.service;

import com.boussas.store.dto.OrderDTO;
import com.boussas.store.mapper.OrderMapper;
import com.boussas.store.model.Order;
import com.boussas.store.model.OrderStatus;
import com.boussas.store.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminOrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public AdminOrderService(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

     
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

     
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
        return orderMapper.toDTO(order);
    }

     
    public OrderDTO updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));

        order.setStatus(status);
        Order updated = orderRepository.save(order);
        return orderMapper.toDTO(updated);
    }

     
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with id " + id);
        }
        orderRepository.deleteById(id);
    }
}
