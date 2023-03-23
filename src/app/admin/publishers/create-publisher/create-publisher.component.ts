import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublisherService } from 'src/app/shared/services/publisher/publisher.service';

@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
  styleUrls: ['./create-publisher.component.scss']
})
export class CreatePublisherComponent {

  publisherForm : FormGroup;
  // uniqueNameError: string = '';

  constructor(private _fb : FormBuilder, private _publisherService : PublisherService, private _router : Router) {
    this.publisherForm = this._fb.group({
      name : [null, [Validators.required, Validators.maxLength(100)]],
      place : [null],
      website : [null]
    })
  }

  createPublisher() : void {
    // this.uniqueNameError = '';
    if (this.publisherForm.valid) {
      this._publisherService.create(this.publisherForm.value).subscribe({

        next : (res) => {
          
        },

        error : (error) => {
          // console.log(error);
          // if (error.error.statusCode === 409) {
          //   this.uniqueNameError = error.error.msg;
          // }
        },

        complete : () => {
          this._router.navigateByUrl('/admin/publisher');
        }
      })
    }
    else {
      this.publisherForm.markAllAsTouched();
    }
  }

}
