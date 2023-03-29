import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Edition } from 'src/app/shared/models/edition';
import { EditionService } from 'src/app/shared/services/edition/edition.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  listEditions : Edition[] = [];

  constructor(
        private _editionService : EditionService, 
        private _router : Router
      ) {}

  ngOnInit() : void {
    this._editionService.getAll().subscribe({
      next : (res) => {
        // console.log('RES', res);
        this.listEditions = res.results;
      }
    })
  }

  // addBookToOrder() : void {

  // }

}
