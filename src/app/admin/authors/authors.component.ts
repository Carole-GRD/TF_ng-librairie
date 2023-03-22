import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { AuthorService } from 'src/app/shared/services/author/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  
  listAuthors : Author[] = [];
  countAuthors! : number;

  constructor(
    private _authorService : AuthorService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this._authorService.getAll().subscribe({
      next : (res) => {
        console.log('RES : ', res);
        this.listAuthors = res.results;
        this.countAuthors = res.count;
      },
      error : (err) => {
        console.log('ERR : ', err);
        
      },
      complete : () => {
        console.log('COMPLETE');

      }
    })
  }



}
