import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublisherService } from 'src/app/shared/services/publisher/publisher.service';

@Component({
  selector: 'app-update-publisher',
  templateUrl: './update-publisher.component.html',
  styleUrls: ['./update-publisher.component.scss']
})
export class UpdatePublisherComponent implements OnInit {

  publisherForm : FormGroup;
  publisherId : number;
  // // uniqueNameError: string = '';

  constructor(
      private _fb : FormBuilder, 
      private _publisherService : PublisherService, 
      private _router : Router,
      private _activatedRoute : ActivatedRoute
    ) {
      this.publisherForm = this._fb.group({
        name : [null, [Validators.required, Validators.maxLength(100)]],
        place : [null],
        website : [null]
      })
      this.publisherId= parseInt(this._activatedRoute.snapshot.params['id']);
  }

  ngOnInit() : void {
    this._publisherService.getById(this.publisherId).subscribe({
     
      next : (res) => {
        this.publisherForm.patchValue({
          name : res.result.name,
          place : res.result.place,
          website : res.result.website
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

  updatePublisher() : void {
    if (this.publisherForm.valid) {
      this._publisherService.update(this.publisherId, this.publisherForm.value).subscribe({
        error : (err) => {
          // if (err.status === 409) {
          //   this.uniqueNameError = err.error.msg; 
          // }
        },
        complete : () => {
          this._router.navigateByUrl('/admin/publisher')
        }
      })
    }
    else {
      this.publisherForm.markAllAsTouched();
    }
  }

}
