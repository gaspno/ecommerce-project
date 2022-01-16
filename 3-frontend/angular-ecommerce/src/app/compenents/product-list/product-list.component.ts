import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts(){
    this.productService.getProductList().subscribe(
      data =>{
        this.products=data;       
      }
    );
  }

}
