package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/checkout")
public class CheckOutcontroller {

    private CheckOutService checkOutService;

    @Autowired
    public  CheckOutcontroller(CheckOutService checkOutService){
        this.checkOutService=checkOutService;

    }
    @PostMapping(value ="purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        PurchaseResponse response=checkOutService.placeOrder(purchase);

        return response;
    }

}
