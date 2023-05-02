import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  getProductListByCategory(categoryId: number): Observable<Product[]> {


    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductListByName(productName: string): Observable<Product[]> {


    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${productName}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductById(id: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/products/${id}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  getProductList(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductCategoryList(): Observable<ProductCategory[]>{

    const searchUrl = `${this.baseUrl}/product-category`;

    return this.httpClient.get<GetResponseProductsCategory>(searchUrl).pipe(
      map(response =>  response._embedded.productCategory)
    )
  }
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductsCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}