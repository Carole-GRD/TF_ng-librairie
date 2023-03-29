import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BooksComponent } from './books/books.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfilComponent } from './profil/profil.component';
import { DetailBookComponent } from './books/detail-book/detail-book.component';
import { BasketComponent } from './basket/basket.component';


@NgModule({
  declarations: [
    UserComponent,
    BooksComponent,
    OrdersComponent,
    ProfilComponent,
    DetailBookComponent,
    BasketComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
