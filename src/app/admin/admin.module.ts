import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthorsComponent } from './authors/authors.component';


@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  bootstrap: [
    AdminComponent
  ]
})
export class AdminModule { }
