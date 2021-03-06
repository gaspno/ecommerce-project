package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "image_url", nullable = false)
    private String imageUrl;
    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "product_id", nullable = false)
    private Long productId;
    @ManyToOne
    @JoinColumn(name ="order_id")
    private Order order;




}