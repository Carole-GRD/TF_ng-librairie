import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'app-create-format',
  templateUrl: './create-format.component.html',
  styleUrls: ['./create-format.component.scss']
})
export class CreateFormatComponent {

  formatForm : FormGroup;
  // uniqueNameError: string = '';

  constructor(private _fb : FormBuilder, private _formatService : FormatService, private _router : Router) {
    this.formatForm = this._fb.group({
      name : [null, [Validators.required, Validators.maxLength(50)]]
    })
  }

  createFormat() : void {
    // this.uniqueNameError = '';
    if (this.formatForm.valid) {
      this._formatService.create(this.formatForm.value).subscribe({

        next : (res) => {
          
        },

        error : (error) => {
          // console.log(error);
          // if (error.error.statusCode === 409) {
          //   this.uniqueNameError = error.error.msg;
          // }
        },

        complete : () => {
          this._router.navigateByUrl('/admin/format');
        }
      })
    }
    else {
      this.formatForm.markAllAsTouched();
    }
  }

}
