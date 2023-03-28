import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateAuthorComponent } from './authors/update-author/update-author.component';
import { FormatsComponent } from './formats/formats.component';
import { CreateFormatComponent } from './formats/create-format/create-format.component';
import { UpdateFormatComponent } from './formats/update-format/update-format.component';
import { GenresComponent } from './genres/genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { UpdateGenreComponent } from './genres/update-genre/update-genre.component';
import { PublishersComponent } from './publishers/publishers.component';
import { CreatePublisherComponent } from './publishers/create-publisher/create-publisher.component';
import { UpdatePublisherComponent } from './publishers/update-publisher/update-publisher.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { BooksComponent } from './books/books.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { UpdateBookComponent } from './books/update-book/update-book.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    CreateAuthorComponent,
    UpdateAuthorComponent,
    FormatsComponent,
    CreateFormatComponent,
    UpdateFormatComponent,
    GenresComponent,
    CreateGenreComponent,
    UpdateGenreComponent,
    PublishersComponent,
    CreatePublisherComponent,
    UpdatePublisherComponent,
    UsersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    BooksComponent,
    CreateBookComponent,
    UpdateBookComponent,
    OrdersComponent,
    CreateOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    AdminComponent
  ]
})
export class AdminModule { }
