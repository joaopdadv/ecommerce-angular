import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.css']
})
export class ShopFilterComponent implements OnInit{

  categories: ProductCategory[] = [];

  @ViewChild('pesquisa') pesquisa!:ElementRef;
  
  constructor(private produtoService: ProductService, private router: Router){}

  ngOnInit(): void {
    this.produtoService.getProductCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  navigate(){
    this.router.navigateByUrl(`/pesquisa/${this.pesquisa.nativeElement.value}`);
  }
  
}
