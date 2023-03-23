import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/shared/models/genre';
import { GenreService } from 'src/app/shared/services/genre/genre.service';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  listGenres : Genre[] = [];
  countGenres! : number;

  constructor(private _genreService : GenreService, private _router : Router) {}

  ngOnInit() : void {
    this._genreService.getAll().subscribe({
      next : (res) => {
        console.log('NEXT', res);
        this.listGenres = res.results;
        this.countGenres = res.count;
      },

      error : (err) => {
        console.log('ERROR', err);
      },

      complete : () => {
        console.log('COMPLETE');       
      }
    })
  }

  deleteGenre(id: number) {
    this._genreService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._genreService.getAll().subscribe((res) => { this.listGenres = res.results; this.countGenres = res.count; });
      }
    })
  }

}
