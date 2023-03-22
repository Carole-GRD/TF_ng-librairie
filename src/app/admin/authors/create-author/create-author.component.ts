import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/shared/services/author/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent {

  authorForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _authorService : AuthorService,
    private _router : Router
  ) {
    this.authorForm = this._fb.group({
      firstname : [null, [Validators.required]],
      lastname : [null, [Validators.required]],
      birthdate : [null],
      biography : [null],
      // photo : [null]
    })
  }

  myFile! : File
  loadFile(e : any) {
    this.myFile = e.target.files[0]
  }

  createAuthor() : void {
    if (this.authorForm.valid) {
      this._authorService.create(this.authorForm.value, this.myFile).subscribe({
        next : (res) => {},
        error : (err) => {},
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
