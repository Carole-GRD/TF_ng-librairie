import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edition } from 'src/app/shared/models/edition';
import { EditionService } from 'src/app/shared/services/edition/edition.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss']
})
export class DetailBookComponent implements OnInit {

  edition! : Edition;
  editionId : number;
  bookId! : number;
  lastIndex! : number;

  constructor(
        private _editionService : EditionService,
        private _activatedRoute : ActivatedRoute
  ) {
    this.editionId = parseInt(this._activatedRoute.snapshot.params['id']);
  }


  ngOnInit(): void {
    this._editionService.getById(this.editionId).subscribe({
      next : (res) => {
        console.log(res.result);
        this.edition = res.result; 
        if (this.edition.Book) {
          this.lastIndex = parseInt(this.edition.Book?.Authors.length.toString()) - 1;
        }
        console.log(this.lastIndex);
      }
    })
    
  }
}
