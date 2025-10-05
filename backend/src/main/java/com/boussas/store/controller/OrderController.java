package com.boussas.store.controller;

import com.boussas.store.dto.OrderDTO;
import com.boussas.store.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

     
    @GetMapping
    public List<OrderDTO> getOrdersByUser(@RequestParam Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

     
    @GetMapping("/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

     
    @PostMapping
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(orderDTO);
    }
}
