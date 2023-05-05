import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  pageSize: number = 8;
  totalElements: number = 0;
  
  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.pageNumber = 1;
      this.listProducts();
    }) 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("init");
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

    this.productService.getProductListByNamePaginate((this.pageNumber - 1), this.pageSize,this.productName).subscribe(this.processData())
  }

  handleList(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    
      this.productService.getProductListByCategoryPaginate((this.pageNumber - 1), this.pageSize, this.categoryId).subscribe(this.processData())
    }else{
      this.productService.getProductListPaginate((this.pageNumber - 1), this.pageSize).subscribe(this.processData())
    }
  }

  updatePageSize(size: string){
      this.pageSize = +size;
      this.pageNumber = 1;
      this.listProducts();
  }

  processData(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.totalElements = data.page.totalElements;
    }
  }
}
