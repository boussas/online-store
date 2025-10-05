package com.boussas.store.admin.controller;

import com.boussas.store.admin.service.AdminOrderService;
import com.boussas.store.dto.OrderDTO;
import com.boussas.store.model.OrderStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    public AdminOrderController(AdminOrderService adminOrderService) {
        this.adminOrderService = adminOrderService;
    }

     
    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return adminOrderService.getAllOrders();
    }

     
    @GetMapping("/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return adminOrderService.getOrderById(id);
    }

     
    @PatchMapping("/{id}/status")
    public OrderDTO updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return adminOrderService.updateOrderStatus(id, status);
    }

     
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        adminOrderService.deleteOrder(id);
    }
}
