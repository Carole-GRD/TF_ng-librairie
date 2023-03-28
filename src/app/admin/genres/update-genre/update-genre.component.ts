import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/shared/services/genre/genre.service';


@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: ['./update-genre.component.scss']
})
export class UpdateGenreComponent implements OnInit {

  genreForm : FormGroup;
  genreId : number;
  // // uniqueNameError: string = '';

  constructor(
      private _fb : FormBuilder, 
      private _genreService : GenreService, 
      private _router : Router,
      private _activatedRoute : ActivatedRoute
    ) {
      this.genreForm = this._fb.group({
        name : [null, [Validators.required, Validators.maxLength(50)]]
      })
      this.genreId = parseInt(this._activatedRoute.snapshot.params['id']);
  }

  ngOnInit() : void {
    this._genreService.getById(this.genreId).subscribe({
     
      next : (res) => {
        this.genreForm.patchValue({
          name : res.result.name
        })
      },

      error : (err) => {
        console.log('err', err);
        if (err.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },

      complete : () => {
        
      }
    })
  }

  updateGenre() : void {
    if (this.genreForm.valid) {
      this._genreService.update(this.genreId, this.genreForm.value).subscribe({
        error : (err) => {
          // if (err.status === 409) {
          //   this.uniqueNameError = err.error.msg; 
          // }
        },
        complete : () => {
          this._router.navigateByUrl('/admin/genre')
        }
      })
    }
    else {
      this.genreForm.markAllAsTouched();
    }
  }
}
