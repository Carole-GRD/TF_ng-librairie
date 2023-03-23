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

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    CreateAuthorComponent,
    UpdateAuthorComponent,
    FormatsComponent,
    CreateFormatComponent,
    UpdateFormatComponent
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
