import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { BooksComponent } from './books/books.component';
import { DetailBookComponent } from './books/detail-book/detail-book.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: 'book', component: BooksComponent },
  { path: 'book/detail/:id', component: DetailBookComponent },
  { path: 'order', component: OrdersComponent} ,
  { path: 'profil', component: ProfilComponent },
  { path: 'basket', component: BasketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
