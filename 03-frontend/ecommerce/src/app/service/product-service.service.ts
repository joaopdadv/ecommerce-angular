import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { Page } from '../common/page';

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

  getProductListPaginate(page:number, size: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products?page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductListByCategoryPaginate(page:number, size: number, categoryId:number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
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
  },
  page: Page;
}

interface GetResponseProductsCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}