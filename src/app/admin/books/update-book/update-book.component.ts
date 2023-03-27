import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Author } from 'src/app/shared/models/author';
import {
  Book,BookAuthorUpdate,/*, BookToUpdate*/
  BookUpdate
} from 'src/app/shared/models/book';
import { Genre } from 'src/app/shared/models/genre';
import { AuthorService } from 'src/app/shared/services/author/author.service';
import { BookService } from 'src/app/shared/services/book/book.service';
import { GenreService } from 'src/app/shared/services/genre/genre.service';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  bookForm: FormGroup;
  bookId: number;
  listGenres: Genre[] = [];
  listAuthors: Author[] = [];
  listAuthorsDelete: number[] = [];


  constructor(
    private _fb: FormBuilder,
    private __bookService: BookService,
    private _genreService: GenreService,
    private _authorService: AuthorService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.bookForm = this._fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      publication_date: [null, [Validators.required]],
      GenreId: [null],
      authors: this._fb.array([])
    })
    this.bookId = parseInt(this._activatedRoute.snapshot.params['id']);
    if (this.listAuthors.length > 0) {
      for (let i = 0; i < this.listAuthors.length; i++) {
        this.authorsForm.push(
          // new FormControl(this.listAuthors[i], Validators.required)
          new FormControl(null, Validators.required)
        );
      }
    }
  }

  ngOnInit(): void {
    this.__bookService.getById(this.bookId).subscribe({
      next: (res) => {
        res.result.publication_date = new Date(res.result.publication_date);
        this.bookForm.patchValue({
          title: res.result.title,
          description: res.result.description,
          publication_date: `${res.result.publication_date.getFullYear()}-${(res.result.publication_date.getMonth() + 1 < 10) ? '0' + (res.result.publication_date.getMonth() + 1) : (res.result.publication_date.getMonth() + 1)}-${(res.result.publication_date.getDate() < 10) ? '0' + res.result.publication_date.getDate() : res.result.publication_date.getDate()}`,
          GenreId: res.result.Genre?.id,
          // authors : res.result.Authors
        })
        res.result.Authors.forEach(_ => {
          this.addAuthor();
        })
        this.authorsForm.patchValue(res.result.Authors.map(author => author.id))
      },
      error: (err) => {
        console.log('err', err);
        if (err.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete: () => { }
    })

    this._genreService.getAll().subscribe({
      next: (res) => {
        this.listGenres = res.results;
      }
    })

    this._authorService.getAll().subscribe({
      next: (res) => {
        this.listAuthors = res.results;
      }
    })
  }

  updateBook(): void {
    if (this.bookForm.valid) {

      // Suppression des auteurs
      let authorsdelete : BookAuthorUpdate = { authors: this.listAuthorsDelete };
      let $authorDelete = this.__bookService.authordelete(this.bookId, authorsdelete)

      // Ajout des auteurs
      let authors : BookAuthorUpdate = { authors: this.bookForm.value.authors };
      let $authorCreate = this.__bookService.authorcreate(this.bookId, authors)

      // Modification du livre
      let bookToUpdate: BookUpdate = {
        title: this.bookForm.value.title,
        description: this.bookForm.value.description,
        publication_date: this.bookForm.value.publication_date,
        GenreId: this.bookForm.value?.GenreId
      }
      // console.log('bookToUpdate : ', bookToUpdate);

      let $bookupdate = this.__bookService.update(this.bookId, bookToUpdate)

      // https://rxjs.dev/api/index/function/forkJoin
      //le forkJoin prend un tableau d'Observables en paramètre, le complete se déclenche une fois que tous les observables fournis sont complete
      forkJoin([$authorDelete, $authorCreate, $bookupdate]).subscribe({
        next : () => {
          console.log('FORK NEXT');  
        },
        error: (error) => {
          if (error.status === 404) {
            console.log(error);
            this._router.navigateByUrl('/not-found')
          }
        },
        complete: () => {
          this._router.navigateByUrl('/admin/book')
        }
      })

    }
    else {
      this.bookForm.markAllAsTouched();
    }
  }


  get authorsForm(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }


  addAuthor(): void {
    this.authorsForm.push(new FormControl(null, Validators.required));
  }


  removeAuthor(id: number): void {

    const authorId = this.bookForm.value.authors[id];
    this.listAuthorsDelete.push(authorId);

    this.authorsForm.removeAt(id);
  }

}
