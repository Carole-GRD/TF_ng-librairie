import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'app-update-format',
  templateUrl: './update-format.component.html',
  styleUrls: ['./update-format.component.scss']
})
export class UpdateFormatComponent implements OnInit {

  formatForm : FormGroup;
  formatId : number;
  // // uniqueNameError: string = '';

  constructor(
      private _fb : FormBuilder, 
      private _formatService : FormatService, 
      private _router : Router,
      private _activatedRoute : ActivatedRoute
    ) {
      this.formatForm = this._fb.group({
        name : [null, [Validators.required, Validators.maxLength(50)]]
      })
      this.formatId= parseInt(this._activatedRoute.snapshot.params['id']);
  }

  ngOnInit() : void {
    this._formatService.getById(this.formatId).subscribe({
     
      next : (res) => {
        this.formatForm.patchValue({
          name : res.result.name
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

  updateFormat() : void {
  if (this.formatForm.valid) {
    this._formatService.update(this.formatId, this.formatForm.value).subscribe({
      error : (err) => {
        // if (err.status === 409) {
        //   this.uniqueNameError = err.error.msg; 
        // }
      },
      complete : () => {
        this._router.navigateByUrl('/admin/format')
      }
    })
  }
  else {
    this.formatForm.markAllAsTouched();
  }
}

  
}
