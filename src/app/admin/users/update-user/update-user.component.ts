import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userForm : FormGroup;
  userId : number;

  constructor(
    private _fb : FormBuilder,
    private _userService : UserService,
    private _router : Router,
    private _activatedRoute : ActivatedRoute
  ) {
    this.userForm = this._fb.group({
      firstname : [null, [Validators.required]],
      lastname : [null, [Validators.required]],
      pseudo : [null],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]],
      role : [null, [Validators.required]],
      // avatar : [null]
    })
    this.userId = parseInt(this._activatedRoute.snapshot.params['id']);
  }

  fileAvatar! : File;
  loadFile(e : any) : void {
    this.fileAvatar = e.target.files[0]
  }

  ngOnInit(): void {
    this._userService.getById(this.userId).subscribe({
      next : (res) => {
        this.userForm.patchValue({
          firstname : res.result.firstname,
          lastname : res.result.lastname,
          pseudo : res.result.pseudo,
          email : res.result.email,
          password : res.result.password,
          role : res.result.role,
          avatar : res.result.avatar
        })
      },
      error : (err) => {
        console.log(err);
        if (err.status === 404) {
          this._router.navigateByUrl('/not-found');
        }
        
      },
      complete : () => {},
    })
  }

  updateUser() {
    console.log('updateUser()');
  
    if (this.userForm.valid) {
      console.log(this.fileAvatar);

      this._userService.update(this.userId, this.userForm.value, this.fileAvatar).subscribe({
        error : () => {},
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
