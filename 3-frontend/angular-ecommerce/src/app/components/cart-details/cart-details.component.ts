import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[]
  totalPrice:number=0
  totalQuantity:number=0

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails()
  }
  listCartDetails() {
    this.cartItems=this.cartService.cartItems
    this.cartService.totalPrice.subscribe(
      total => this.totalPrice=total
      )
    this.cartService.totalQuantity.subscribe(
      quantity => this.totalQuantity=quantity
        )
        
    this.cartService.computeCartTotal();

  }
  incrementQuanity(c:CartItem){
    this.cartService.addToCart(c);

  }
  decrementQuanity(c:CartItem){
    this.cartService.removeOneToCart(c);

  }
  remove(c:CartItem){
    this.cartService.removeToCart(c)
  }

}
