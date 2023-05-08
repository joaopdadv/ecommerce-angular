import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){
    // check if already have the item in the cart
    let alreadyExists:boolean = false;
    let existingCartItem:CartItem | undefined = undefined;

    if(this.cartItems.length > 0){

      // find the item in the cart based on item id  
      existingCartItem = this.cartItems.find(item => item.id == cartItem.id);
    
      // check if found
      alreadyExists = (existingCartItem != undefined);
    }

    //add to cart
    if(alreadyExists){
      existingCartItem!.quantity++;
    }else{
      this.cartItems.push(cartItem);
    }

    //compute change
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let cartItem of this.cartItems){
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart: ')
    for (let cartItem of this.cartItems){
      const subTotal = cartItem.unitPrice * cartItem.quantity;
      console.log(`nome: ${cartItem.name}, quantidade: ${cartItem.quantity}, preço da unidade: ${cartItem.unitPrice}, subtotal: ${subTotal}\n`);
    }

    console.log(`total: ${totalPriceValue.toFixed(2)}, quantidade total: ${totalQuantityValue}`);
    console.log('-----------------');
  }
}
