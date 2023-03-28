import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publisher } from 'src/app/shared/models/publisher';
import { PublisherService } from 'src/app/shared/services/publisher/publisher.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {

  listPublishers : Publisher[] = [];
  countPublishers! : number;

  constructor(private _publisherService : PublisherService, private _router : Router) {}

  ngOnInit() : void {
    this._publisherService.getAll().subscribe({
      next : (res) => {
        // console.log('NEXT', res);
        this.listPublishers = res.results;
        this.countPublishers = res.count;
      },

      error : (err) => {
        // console.log('ERROR', err);
      },

      complete : () => {
        // console.log('COMPLETE');       
      }
    })
  }

  deletePublisher(id: number) {
    this._publisherService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._publisherService.getAll().subscribe((res) => { this.listPublishers = res.results; this.countPublishers = res.count; });
      }
    })
  }

}
