import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { Format } from 'src/app/shared/models/format';
import { Publisher } from 'src/app/shared/models/publisher';
import { BookService } from 'src/app/shared/services/book/book.service';
import { EditionService } from 'src/app/shared/services/edition/edition.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { PublisherService } from 'src/app/shared/services/publisher/publisher.service';


@Component({
  selector: 'app-create-edition',
  templateUrl: './create-edition.component.html',
  styleUrls: ['./create-edition.component.scss']
})
export class CreateEditionComponent implements OnInit {

  editionForm : FormGroup;
  listPublishers : Publisher[] = [];
  listFormats : Format[] = [];
  listBooks : Book[] = [];

  constructor(
      private _fb : FormBuilder, 
      private _editionService : EditionService, 
      private _publisherService : PublisherService,
      private _formatService : FormatService,
      private _bookService : BookService,
      private _router : Router
      ) {
      this.editionForm = this._fb.group({
        ISBN : [null, [Validators.required]],
        price : [null, [Validators.required]],
        stock : [null],
        PublisherId : [null],
        FormatId : [null],
        BookId : [null],
      })
  }

  fileCover! : File
  loadFile(e : any) : void {
    this.fileCover = e.target.files[0]
  }

  ngOnInit(): void {
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

  createEdition() : void {
    if (this.editionForm.valid) {
      
      this._editionService.create(this.editionForm.value, this.fileCover).subscribe({
        next : (res) => {},
        error : (error) => {},
        complete : () => {
          this._router.navigateByUrl('/admin/edition');
        }
      })
    }
    else {
      this.editionForm.markAllAsTouched();
    }
  }
}
