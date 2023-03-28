import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Edition } from 'src/app/shared/models/edition';
import { EditionService } from 'src/app/shared/services/edition/edition.service';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss']
})
export class EditionsComponent implements OnInit {

  listEditions : Edition[] = [];
  countEditions! : number;

  constructor(private _editionService : EditionService, private _router : Router) {}

  ngOnInit() : void {
    this._editionService.getAll().subscribe({
      next : (res) => {
        // console.log('NEXT', res);
        this.listEditions = res.results;
        this.countEditions = res.count;
      },

      error : (err) => {
        // console.log('ERROR', err);
      },

      complete : () => {
        // console.log('COMPLETE');       
      }
    })
  }

  deleteEdition(id: number) {
    this._editionService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._editionService.getAll().subscribe((res) => { this.listEditions = res.results; this.countEditions = res.count; });
      }
    })
  }
}
