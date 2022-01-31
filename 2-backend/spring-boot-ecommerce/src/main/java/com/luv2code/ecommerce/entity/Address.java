package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "zip_code", nullable = false)
    private String zipCode;
    @Column(name = "street", nullable = false)
    private String street;
    @Column(name = "state", nullable = false)
    private String state;
    @Column(name = "country", nullable = false)
    private String country;
    @Column(name = "city", nullable = false)
    private String city;
    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order ;



}