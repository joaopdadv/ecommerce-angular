import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit{

  cartList: CartItem[] = [

  ]

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartList = this.cartService.cartItems;
  }

}
