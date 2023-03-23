import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { UpdateAuthorComponent } from './authors/update-author/update-author.component';
import { CreateFormatComponent } from './formats/create-format/create-format.component';
import { FormatsComponent } from './formats/formats.component';
import { UpdateFormatComponent } from './formats/update-format/update-format.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { GenresComponent } from './genres/genres.component';
import { UpdateGenreComponent } from './genres/update-genre/update-genre.component';

const routes: Routes = [
  { path: 'author', component: AuthorsComponent },
  { path: 'author/create', component: CreateAuthorComponent },
  { path: 'author/update/:id', component: UpdateAuthorComponent},
  { path: 'format', component: FormatsComponent },
  { path: 'format/create', component: CreateFormatComponent },
  { path: 'format/update/:id', component: UpdateFormatComponent },
  { path: 'genre', component: GenresComponent },
  { path: 'genre/create', component: CreateGenreComponent },
  { path: 'genre/update/:id', component: UpdateGenreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
