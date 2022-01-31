package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "email", nullable = false)
    private String email;
    @OneToMany(mappedBy="customer",cascade=CascadeType.ALL)
    private Set<Order> orders=new HashSet<>();

    public void add(Order order){
        if(order!=null){
            if(orders==null){
                orders=new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this);
        }
    }




}