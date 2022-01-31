package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckOutServiceImpl implements CheckOutService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();
        String orderTrackinigNumber=generateTrackinigNumber();
        order.setOrderTrackingNumber(orderTrackinigNumber);

        Set<OrderItem> orderItems=purchase.getOrderItems();
        orderItems.forEach(item ->order.add(item) );

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer=purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);




        return new PurchaseResponse(orderTrackinigNumber);
    }

    private String generateTrackinigNumber() {
        return UUID.randomUUID().toString();
    }
}
