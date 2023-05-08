import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.css'],
  animations: [
    trigger(
      'valueChanged',
      [
          transition('void => *', [
            animate(120, keyframes([ 
              style ({ opacity : 0 }),
              style ({ opacity : 1 }),
            ])),
          ]),   // when the item is created
          transition('* => void', [      // when the item is removed
            animate(120, keyframes([ 
                style ({ opacity : 1 }),
                style ({ opacity : 0 }),
              ])),
          ]),
          transition('* => *', [         // when the item is changed

          ]),
      ]),
  ]
})
export class ShopFilterComponent implements OnInit{

  showDialog: boolean = false;
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
  
  toggleDialog(){
    this.showDialog = !this.showDialog;
  }
}
