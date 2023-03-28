import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/services/book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  listBooks : Book[] = [];
  countBooks! : number;

  constructor(private _bookService : BookService, private _router : Router) {}

  ngOnInit() : void {
    this._bookService.getAll().subscribe({
      next : (res) => {
        // console.log('NEXT', res);
        this.listBooks = res.results;
        this.countBooks = res.count;
      },

      error : (err) => {
        // console.log('ERROR', err);
      },

      complete : () => {
        // console.log('COMPLETE');       
      }
    })
  }

  deleteBook(id: number) {
    this._bookService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._bookService.getAll().subscribe((res) => { this.listBooks = res.results; this.countBooks = res.count; });
      }
    })
  }

}
