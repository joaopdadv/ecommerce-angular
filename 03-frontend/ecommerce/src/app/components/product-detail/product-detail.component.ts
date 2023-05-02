import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  produto!:Product;
  categoryId!:number;

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe(() => {
      this.productService.getProductById(this.categoryId).subscribe(
        data => {
          this.produto = data;
        }
      )
    })
  }

}
