import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  categoryId!: number;
  productName!: string;

  pageNumber:number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  
  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    
  }

  listProducts(){

    const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');


    if(searchMode){
     this.handleSearch();
    }else{
      this.handleList();
    }
  }

  handleSearch(){
    this.productName = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.getProductListByName(this.productName).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleList(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;

      console.log(this.categoryId);
    
      this.productService.getProductListByCategoryPaginate((this.pageNumber - 1), this.pageSize, this.categoryId).subscribe(
        data => {
          this.products = data._embedded.products;
          this.totalElements = data.page.totalElements;
        }
      )
    }else{
      this.productService.getProductListPaginate((this.pageNumber - 1), this.pageSize).subscribe(
        data => {
          this.products = data;
        }
      )
    }
  }

  updatePageSize(size: string){
      this.pageSize = +size;
      this.pageNumber = 1;
      this.listProducts();
  }
}
