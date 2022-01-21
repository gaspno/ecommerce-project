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
  currentCategoryId: number=1;
  previusCategoryId: number=1;
  searchMode:boolean=false;

  thePageNumber:number=1;
  thePageSize:number=5;
  totalNumberElements:number=0;
  previousKeyword:string="";
  

  constructor(private productService:ProductsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(()=>{
    this.listProducts();
  }
    );
   
  }
  updateSizePage(pageSize:number){
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();

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

    if(this.previusCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previusCategoryId=this.currentCategoryId;

    console.log(`current category id=${this.currentCategoryId}, current page = ${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
    .subscribe(data=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.totalNumberElements=data.page.totalElements;
    });
  }
 
  
  handleSearchProducts() {
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')??"";

    if(this.previousKeyword=theKeyword){
      this.previousKeyword=theKeyword;
    }
    console.log(`current keyword ${theKeyword}, previus keyword = ${this.previousKeyword}`)


    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               theKeyword)
                                               .subscribe(data=>{
                                                this.products=data._embedded.products;
                                                this.thePageNumber=data.page.number+1;
                                                this.thePageSize=data.page.size;
                                                this.totalNumberElements=data.page.totalElements;
                                               })

  }

}
