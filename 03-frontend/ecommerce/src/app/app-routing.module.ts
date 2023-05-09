import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'pesquisa/:keyword', component: HomePageComponent},
  {path: 'categoria/:id', component: HomePageComponent},
  {path: 'categoria', component: HomePageComponent},
  {path: 'produto/:id', component: ProductDetailComponent},
  {path: 'carrinho', component: CartListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
