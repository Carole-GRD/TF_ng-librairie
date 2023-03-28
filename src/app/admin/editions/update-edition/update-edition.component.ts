import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { Format } from 'src/app/shared/models/format';
import { Publisher } from 'src/app/shared/models/publisher';
import { BookService } from 'src/app/shared/services/book/book.service';
import { EditionService } from 'src/app/shared/services/edition/edition.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { PublisherService } from 'src/app/shared/services/publisher/publisher.service';

@Component({
  selector: 'app-update-edition',
  templateUrl: './update-edition.component.html',
  styleUrls: ['./update-edition.component.scss']
})
export class UpdateEditionComponent implements OnInit {

  editionForm : FormGroup;
  editionId : number;
  listPublishers : Publisher[] = [];
  listFormats : Format[] = [];
  listBooks : Book[] = [];

  constructor(
    private _fb : FormBuilder,
    private _editionService : EditionService,
    private _publisherService : PublisherService,
    private _formatService : FormatService,
    private _bookService : BookService,
    private _router : Router,
    private _activatedRoute : ActivatedRoute
  ) {
    this.editionForm = this._fb.group({
      ISBN : [null, [Validators.required]],
      price : [null, [Validators.required]],
      stock : [null],
      PublisherId : [null],
      FormatId : [null],
      BookId : [null],
    })
    this.editionId = parseInt(this._activatedRoute.snapshot.params['id']);
  }

  fileCover! : File;
  loadFile(e : any) : void {
    this.fileCover = e.target.files[0]
  }

  ngOnInit(): void {
    this._editionService.getById(this.editionId).subscribe({
      next : (res) => {
        this.editionForm.patchValue({
          ISBN : res.result.ISBN,
          price : res.result.price,
          stock : res.result.stock,
          PublisherId : res.result.Publisher?.id,
          FormatId : res.result.Format?.id,
          BookId : res.result.Book?.id,
          cover : res.result.cover,
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

    this._publisherService.getAll().subscribe({
      next : (res) => {
        this.listPublishers = res.results;
      }
    })
    this._formatService.getAll().subscribe({
      next : (res) => {
        this.listFormats = res.results;
      }
    })
    this._bookService.getAll().subscribe({
      next : (res) => {
        this.listBooks = res.results;
      }
    })
  }

  updateEdition() {
    if (this.editionForm.valid) {
      this._editionService.update(this.editionId, this.editionForm.value, this.fileCover).subscribe({
        error : () => {},
        complete : () => {
          this._router.navigateByUrl('/admin/edition')
        }
      })
    }
    else {
      this.editionForm.markAllAsTouched();
    }
  }
}
