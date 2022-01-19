import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product:Product=new Product();

  constructor(private productService:ProductsService,private route:ActivatedRoute ) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(()=>{
      this.handlerPtoductDeatil()
    })
  }

  handlerPtoductDeatil() {
    const productId:number=Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(productId).subscribe(data=>{
    this.product=data;
    })
  }

}
