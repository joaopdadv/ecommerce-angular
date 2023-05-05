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

  /////////////////////// PRODUCT LIST BY CATEGORY 

  getProductListByName(productName: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${productName}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductListByNamePaginate(page:number, size: number,productName: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${productName}&page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /////////////////////// PRODUCT LIST BY ID 

  getProductById(id: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/products/${id}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  /////////////////////// PRODUCT LIST 

  getProductList(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  getProductListPaginate(page:number, size: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products?page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /////////////////////// PRODUCT LIST BY CATEGORY 

  getProductListByCategoryPaginate(page:number, size: number, categoryId:number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductListByCategory(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>  response._embedded.products)
    )
  }

  /////////////////////// PRODUCT CATEGORY LIST 

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