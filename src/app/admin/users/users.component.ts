import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listUsers : User[] = [];
  countUsers! : number;

  constructor(
    private _userService : UserService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe({
      next : (res) => {
        console.log('RES : ', res);
        this.listUsers = res.results;
        this.countUsers = res.count;
      },
      error : (err) => {
        console.log('ERR : ', err);
        
      },
      complete : () => {
        console.log('COMPLETE');

      }
    })
  }

  deleteUser(id : number) {
    this._userService.delete(id).subscribe({
      error : (err) => {
        console.log('erreur de suppression : ', err);
        if(err.status === 404) {
          this._router.navigateByUrl('/not-found');
        }
      },
      complete : () => {
        this._userService.getAll().subscribe((res) => { this.listUsers = res.results; this.countUsers = res.count; });
      }
    })
  }

}
