import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.css']
})
export class ShopFilterComponent implements OnInit{

  categories: ProductCategory[] = [];

  constructor(private produtoService: ProductService){}

  ngOnInit(): void {
    this.produtoService.getProductCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

}
