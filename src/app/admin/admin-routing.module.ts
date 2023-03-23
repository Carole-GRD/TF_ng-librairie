import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { UpdateAuthorComponent } from './authors/update-author/update-author.component';

const routes: Routes = [
  { path: 'author', component: AuthorsComponent },
  { path: 'author/create', component: CreateAuthorComponent },
  { path: 'author/update/:id', component: UpdateAuthorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
