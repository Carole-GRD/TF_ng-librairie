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
        // console.log('RES : ', res);
        this.listAuthors = res.results;
        this.countAuthors = res.count;
      },
      error : (err) => {
        // console.log('ERR : ', err);
        
      },
      complete : () => {
        // console.log('COMPLETE');

      }
    })
  }

  deleteAuthor(id : number) {
    this._authorService.delete(id).subscribe({
      error : (err) => {
        // console.log('erreur de suppression : ', err);
        if(err.status === 404) {
          this._router.navigateByUrl('/not-found');
        }
      },
      complete : () => {
        this._authorService.getAll().subscribe((res) => { this.listAuthors = res.results; this.countAuthors = res.count; });
      }
    })
  }

}
