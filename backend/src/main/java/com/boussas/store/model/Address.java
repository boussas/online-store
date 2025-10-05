package com.boussas.store.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Address {
    @Id
    private Long id;
    private String street;
    private String city;
    private String postalCode;
    private String country;
}
