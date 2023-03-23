import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/shared/services/author/author.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {

  authorForm : FormGroup;
  authorId : number;

  constructor(
    private _fb : FormBuilder,
    private _authorService : AuthorService,
    private _router : Router,
    private _activatedRoute : ActivatedRoute
  ) {
    this.authorForm = this._fb.group({
      firstname : [null, [Validators.required]],
      lastname : [null, [Validators.required]],
      birthdate : [null],
      biography : [null],
      // photo : [null]
    })
    this.authorId = parseInt(this._activatedRoute.snapshot.params['id']);
  }

  filePhoto! : File;
  loadFile(e : any) : void {
    this.filePhoto = e.target.files[0]
  }

  ngOnInit(): void {
    this._authorService.getById(this.authorId).subscribe({
      next : (res) => {
        console.log(res.result.birthdate);
        
        res.result.birthdate = new Date(res.result.birthdate);
        
        this.authorForm.patchValue({
          firstname : res.result.firstname,
          lastname : res.result.lastname,
          // birthdate : res.result.birthdate,
          birthdate : `${res.result.birthdate.getFullYear()}-${(res.result.birthdate.getMonth()+1 < 10 ) ? '0'+(res.result.birthdate.getMonth()+1) : (res.result.birthdate.getMonth()+1) }-${(res.result.birthdate.getDate() < 10 ) ? '0'+ res.result.birthdate.getDate() : res.result.birthdate.getDate()}`,
          biography : res.result.biography,
          photo : res.result.photo,
        })
      },
      error : (err) => {
        console.log(err);
        if (err.status === 404) {
          this._router.navigateByUrl('/not-found');
        }
        
      },
      complete : () => {},
    })
  }

  updateAuthor() {
    if (this.authorForm.valid) {
      this._authorService.update(this.authorId, this.authorForm.value, this.filePhoto).subscribe({
        error : () => {},
        complete : () => {
          this._router.navigateByUrl('/admin/author')
        }
      })
    }
    else {
      this.authorForm.markAllAsTouched();
    }
  }

}
