package com.boussas.store.admin.service;

import com.boussas.store.dto.AddressDTO;
import com.boussas.store.mapper.AddressMapper;
import com.boussas.store.model.Address;
import com.boussas.store.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminAddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    public AdminAddressService(AddressRepository addressRepository, AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
    }

     
    public List<AddressDTO> getAllAddresses() {
        return addressRepository.findAll()
                .stream()
                .map(addressMapper::toDTO)
                .collect(Collectors.toList());
    }

     
    public AddressDTO getAddressById(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id " + id));
        return addressMapper.toDTO(address);
    }

     
    public AddressDTO createAddress(AddressDTO dto) {
        Address address = addressMapper.toEntity(dto);
        Address saved = addressRepository.save(address);
        return addressMapper.toDTO(saved);
    }

     
    public AddressDTO updateAddress(Long id, AddressDTO dto) {
        Address existing = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id " + id));

        existing.setStreet(dto.getStreet());
        existing.setCity(dto.getCity());
        existing.setPostalCode(dto.getPostalCode());
        existing.setCountry(dto.getCountry());

        Address updated = addressRepository.save(existing);
        return addressMapper.toDTO(updated);
    }

     
    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new RuntimeException("Address not found with id " + id);
        }
        addressRepository.deleteById(id);
    }
}
