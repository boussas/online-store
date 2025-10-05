package com.boussas.store.admin.controller;

import com.boussas.store.admin.service.AdminAddressService;
import com.boussas.store.dto.AddressDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/address")
public class AdminAddressController {

    private final AdminAddressService adminAddressService;

    public AdminAddressController(AdminAddressService adminAddressService) {
        this.adminAddressService = adminAddressService;
    }

     
    @GetMapping
    public List<AddressDTO> getAllAddresses() {
        return adminAddressService.getAllAddresses();
    }

     
    @GetMapping("/{id}")
    public AddressDTO getAddressById(@PathVariable Long id) {
        return adminAddressService.getAddressById(id);
    }

     
    @PostMapping
    public AddressDTO createAddress(@RequestBody AddressDTO dto) {
        return adminAddressService.createAddress(dto);
    }

     
    @PutMapping("/{id}")
    public AddressDTO updateAddress(@PathVariable Long id, @RequestBody AddressDTO dto) {
        return adminAddressService.updateAddress(id, dto);
    }

     
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        adminAddressService.deleteAddress(id);
    }
}
