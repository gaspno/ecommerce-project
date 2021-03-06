import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories!: ProductCategory[];

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.listProductsCategories();
  }
  listProductsCategories() {
    this.productService.getProductsCategories().subscribe(
      data =>{        
        this.productCategories=data;      
      }
    );
  }

}
