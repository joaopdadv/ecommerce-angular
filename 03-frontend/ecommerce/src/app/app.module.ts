import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './service/product-service.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ShopFilterComponent } from './components/shop-filter/shop-filter.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomePageComponent,
    TopMenuComponent,
    ShopFilterComponent,
    ProductDetailComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProductService, 
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
