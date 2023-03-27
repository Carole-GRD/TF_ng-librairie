import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { Genre } from 'src/app/shared/models/genre';
import { AuthorService } from 'src/app/shared/services/author/author.service';
import { BookService } from 'src/app/shared/services/book/book.service';
import { GenreService } from 'src/app/shared/services/genre/genre.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm : FormGroup;
  listGenres : Genre[] = [];
  listAuthors : Author[] = [];

  constructor(
      private _fb : FormBuilder, 
      private _bookService : BookService, 
      private _genreService : GenreService,
      private _authorService : AuthorService,
      private _router : Router
      ) {
      this.bookForm = this._fb.group({
        title : [null, [Validators.required]],
        description : [null, [Validators.required]],
        publication_date : [null, [Validators.required]],
        GenreId : [null],
        authors: this._fb.array([])
      })
  }

  ngOnInit() : void {
    this._genreService.getAll().subscribe({
      next : (res) => {
        console.log('NEXT', res);
        this.listGenres = res.results;
      },
      error : (err) => {
        console.log('ERROR', err);
      },
      complete : () => {
        console.log('COMPLETE');       
      }
    })
    this._authorService.getAll().subscribe({
      next : (res) => {
        console.log('NEXT', res);
        this.listAuthors = res.results;
      },
      error : (err) => {
        console.log('ERROR', err);
      },
      complete : () => {
        console.log('COMPLETE');       
      }
    })
  }

  createBook() : void {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      
      this._bookService.create(this.bookForm.value).subscribe({
        next : (res) => {},
        error : (error) => {},
        complete : () => {
          this._router.navigateByUrl('/admin/book');
        }
      })
    }
    else {
      this.bookForm.markAllAsTouched();
    }
  }

  getAuthorsForm(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    this.getAuthorsForm().push(new FormControl(null, Validators.required));
  }

  removeAuthor(id: number): void {
    this.getAuthorsForm().removeAt(id);
  }

}
