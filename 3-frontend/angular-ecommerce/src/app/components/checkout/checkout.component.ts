import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidator } from 'src/app/validators/luv2-shop-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup!: FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;

  creditCardMonths:number[]=[]
  creditCardYears:number[]=[]

  countryList:Country[]=[]

  shippingStates:State[]=[]
  billingStates:State[]=[]


 
  constructor(private formBuilder:FormBuilder,private formService:Luv2ShopFormService,private cartService:CartService,private checkoutService:CheckoutService,private router:Router) { }



  ngOnInit(): void {
    this.checkOutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(5),Luv2ShopValidator.notOnlyWhiteSpace])
      }),
      billingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(5),Luv2ShopValidator.notOnlyWhiteSpace])
      }),
      creditCard:this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),
        nameOnCard:new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidator.notOnlyWhiteSpace]),
        cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:[''],
      }),


    });
    const month:number=new Date().getMonth()+1;
    this.formService.getMonths(month).subscribe(
      data=>{
        this.creditCardMonths=data
      }
    )
   
    this.formService.getYears().subscribe(
      data=>{
        this.creditCardYears=data
      }
    )
    this.formService.getCountries().subscribe(
      data=>{
        console.log("Retrieve countriess: "+JSON.stringify(data))
        this.countryList=data
      });
      this.reviewCartDetails();

  }

  get firstName(){

    return this.checkOutFormGroup.get('customer.firstName')

  }
  get lastName(){

    return this.checkOutFormGroup.get('customer.lastName')

  }
  get email(){

    return this.checkOutFormGroup.get('customer.email')

  }
  get shippingStreet(){
    
    return this.checkOutFormGroup.get('shippingAddress.street')

  }
  get shippingCity(){
    
    return this.checkOutFormGroup.get('shippingAddress.city')

  }

  get shippingZipCode(){
    
    return this.checkOutFormGroup.get('shippingAddress.zipCode')

  }

  get shippingCountry(){
    
    return this.checkOutFormGroup.get('shippingAddress.country')

  }

  get shippingState(){
    
    return this.checkOutFormGroup.get('shippingAddress.state')

  }
  get billingStreet(){
    
    return this.checkOutFormGroup.get('billingAddress.street')

  }
  get billingCity(){
    
    return this.checkOutFormGroup.get('billingAddress.city')

  }

  get billingZipCode(){
    
    return this.checkOutFormGroup.get('billingAddress.zipCode')

  }

  get billingCountry(){
    
    return this.checkOutFormGroup.get('billingAddress.country')

  }

  get billingState(){
    
    return this.checkOutFormGroup.get('billingAddress.state')

  }
  get cardNumber(){
    
    return this.checkOutFormGroup.get('creditCard.cardNumber')

  }

  get cardType(){
    
    return this.checkOutFormGroup.get('creditCard.cardType')

  }

  get nameOnCard(){
    
    return this.checkOutFormGroup.get('creditCard.nameOnCard')

  }
  get securityCode(){
    
    return this.checkOutFormGroup.get('creditCard.securityCode')

  }








  onSubmit(){

    if(this.checkOutFormGroup.invalid){
      this.checkOutFormGroup.markAllAsTouched();
      return
    }
    let order=new Order();
    order.totalQuantity=this.totalQuantity;
    order.totalPrice=this.totalPrice;

    const cartItems=this.cartService.cartItems

    let orderItems:OrderItem []=[]

    for(let i=0;i<cartItems.length;i++){
      orderItems[i]=new OrderItem(cartItems[i])
    }

    let purchase=new Purchase


    purchase.customer=this.checkOutFormGroup.get('customer')?.value




    purchase.shippingAddress=this.checkOutFormGroup.get('shippingAddress')?.value
    const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state=shippingState.name
    purchase.shippingAddress.country=shippingCountry.name;

    
    purchase.billingAddress=this.checkOutFormGroup.get('billingAddress')?.value
    const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state=billingState.name
    purchase.billingAddress.country=billingCountry.name;

    purchase.order=order
    purchase.orderItems=orderItems

    this.checkoutService.placeOrder(purchase).subscribe({
      next:response=>{
        alert(`Your order has been received.\nOrder tracking number :${response.orderTrackingNumber}`)
        this.resetCart()

      },
      error:err=>{
        alert(`Thera was a error :${err.message}`)

      }

    })

    
  }
  resetCart() {
    this.cartService.cartItems=[]
    this.cartService.totalPrice.next(0)
    this.cartService.totalQuantity.next(0)

    this.checkOutFormGroup.reset()

    this.router.navigateByUrl("/products")

  }



  copyShippingToBilling(e: Event){
    if((<HTMLInputElement>e.target).checked){
      this.checkOutFormGroup.get('billingAddress')?.setValue(this.checkOutFormGroup.get('shippingAddress')?.value);
      this.billingStates=this.shippingStates
    }else{
      this.checkOutFormGroup.get('billingAddress')?.reset();
      this.billingStates=[]
    }

  }

  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    )
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    )

  }
  handlerYearsAndMonths(){

    const creditCardMonthsFormGroup=this.checkOutFormGroup.get('creditCard')
    const curretYear:number=new Date().getFullYear()
    const selectYear:number=Number(creditCardMonthsFormGroup?.value.expirationYear)


    let startMonth:number

    if(selectYear===curretYear){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1
    }
    this.formService.getMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonths=data
      }
    )


  }

  getStates(groupName:string){
    const formGroup=this.checkOutFormGroup.get(groupName)
    const countryCode=formGroup?.value.country.code

    this.formService.getStates(countryCode).subscribe(
      data=>{
       
        if(groupName==='shippingAddress'){
          this.shippingStates=data
        }else{
        this.billingStates=data
        }       
        formGroup?.get('state')?.setValue(data[0])
      
        }
    )


  }

}
