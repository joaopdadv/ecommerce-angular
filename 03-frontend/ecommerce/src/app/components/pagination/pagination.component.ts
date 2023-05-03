import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/common/page';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  
  pages:number[] = [];

  constructor(private produtoService: ProductService){}

  ngOnInit(): void {

  }

}
