import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  

  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient:HttpClient ) {

   }
   getProductList(categoryId:number):Observable<Product[]>{

    const searchUrl=this.baseUrl+'/search/findByCategoryId?id='+categoryId;
  
     return this.httpClient.get<GetResponse>(searchUrl).pipe(
       map(response=>response._embedded.products)
     );
   }
   getProductsCategories():Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)      
    );
    
  }


  searchProducts(theKeyword: string):Observable<Product[]> {

    const searchUrl=this.baseUrl+'/search/findByNameContaining?name='+theKeyword;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
       map(response=>response._embedded.products)
     );
  }
  getProduct(id:number):Observable<Product> {

    const searchUrl=this.baseUrl+'/'+id;  
    return this.httpClient.get<Product>(searchUrl)
  }
  
}

interface GetResponse {
  _embedded:{
    products:Product[];
  }
}
interface GetResponseCategory {
  _embedded:{
    productCategory:ProductCategory[];
  }
}

