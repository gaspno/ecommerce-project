import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';




@Injectable({
  providedIn: 'root'
})
export class CartService {
 

  cartItems:CartItem[]=[];

  totalPrice :Subject<number>=new Subject<number>();

  totalQuantity :Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem :CartItem){
   
    let existingCartItem=undefined;
    if(this.cartItems.length>0){
      existingCartItem=this.cartItems.find(temp=>temp.id===theCartItem.id);        
    }
    if(existingCartItem!=undefined){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotal()
  }
  computeCartTotal() {
    let priceTotalValue:number=0;
    let quantityTotalValue:number=0;

    for(let tempCartItem of this.cartItems){
     priceTotalValue+=tempCartItem.quantity*tempCartItem.unitPrice;
     quantityTotalValue+=tempCartItem.quantity;
      }
      this.totalPrice.next(priceTotalValue);
      this.totalQuantity.next(quantityTotalValue);

      //this.logCartData(priceTotalValue,quantityTotalValue);

    }
    removeOneToCart(c: CartItem) {
      c.quantity--;
      if(c.quantity===0){

        this.removeToCart(c);
      }else{
        this.computeCartTotal();
      }
      
    }
  removeToCart(c: CartItem) {
    const itemIndex=this.cartItems.findIndex(cItem=>cItem.id===c.id);

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotal();
    }
  }
  /*logCartData(priceTotalValue: number, quantityTotalValue: number) {
    for(let tempCartItem of this.cartItems){
      const subTotal=tempCartItem.unitPrice*tempCartItem.quantity;
      console.log(`name :${tempCartItem.name}, quantity:${tempCartItem.quantity}, unitPrice:${tempCartItem.unitPrice}, subTotal:${subTotal} `)
     }
     console.log(`totalPrice:${priceTotalValue.toFixed(2)}, totalQuantity:${quantityTotalValue}`)
     console.log('--------')
  }*/


  
}
