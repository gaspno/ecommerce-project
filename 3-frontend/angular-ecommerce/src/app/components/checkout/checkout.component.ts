import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

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


 
  constructor(private formBuilder:FormBuilder,private formService:Luv2ShopFormService) { }



  ngOnInit(): void {
    this.checkOutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
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

  }
  onSubmit(){
    console.log('submit button')
    console.log(this.checkOutFormGroup.get('customer')?.value)
    console.log(this.checkOutFormGroup.get('customer')?.value.email)
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
