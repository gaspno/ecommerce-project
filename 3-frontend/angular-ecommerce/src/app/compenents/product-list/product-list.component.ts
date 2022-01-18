import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  searchMode!:boolean;

  constructor(private productService:ProductsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(()=>{
    this.listProducts();
  }
    );
   
  }
  listProducts(){

    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
    this.handleListProducts();
    }
  }
  
  handleListProducts(){
    const hasId:boolean =this.route.snapshot.paramMap.has('id');
    if(hasId){
      this.currentCategoryId =Number(this.route.snapshot.paramMap.get("id"));
      console.log(this.currentCategoryId)
      
    }else{
      this.currentCategoryId=1;
    
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products=data;             
      }
    );
  }
  handleSearchProducts() {
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')??"";

    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;

})

  }

}
