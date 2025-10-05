package com.boussas.store.service;

import com.boussas.store.model.Address;
import com.boussas.store.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

      
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

      
    public Address getAddressById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id " + id));
    }

      
    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

      
    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new RuntimeException("Address not found with id " + id);
        }
        addressRepository.deleteById(id);
    }
}
