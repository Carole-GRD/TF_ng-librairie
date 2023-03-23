import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  userForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _userService : UserService,
    private _router : Router
  ) {
    this.userForm = this._fb.group({
      firstname : [null, [Validators.required]],
      lastname : [null, [Validators.required]],
      pseudo : [null],
      email : [null],
      password : [null],
      role : [null],
      // avatar : [null]
    })
  }

  fileAvatar! : File
  loadFile(e : any) : void {
    this.fileAvatar = e.target.files[0]
  }

  createUser() : void {
    if (this.userForm.valid) {
      this._userService.create(this.userForm.value, this.fileAvatar).subscribe({
        next : (res) => {},
        error : (err) => {},
        complete : () => {
          this._router.navigateByUrl('/admin/user')
        }
      })
    }
    else {
      this.userForm.markAllAsTouched();
    }
  }

}
