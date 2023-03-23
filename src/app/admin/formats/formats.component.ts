import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from 'src/app/shared/models/format';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.scss']
})
export class FormatsComponent implements OnInit {

  listFormats : Format[] = [];
  countFormats! : number;

  constructor(private _formatService : FormatService, private _router : Router) {}

  ngOnInit() : void {
    this._formatService.getAll().subscribe({
      next : (res) => {
        console.log('NEXT', res);
        this.listFormats = res.results;
        this.countFormats = res.count;
      },

      error : (err) => {
        console.log('ERROR', err);
      },

      complete : () => {
        console.log('COMPLETE');       
      }
    })
  }

  deleteFormat(id: number) {
    this._formatService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._formatService.getAll().subscribe((res) => { this.listFormats = res.results; this.countFormats = res.count; });
      }
    })
  }

}
