import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  // listBooks : Book[] = [];
  // countBooks! : number;
  // orders : Order[] = [];
  // userId! : string | null;

  // constructor(
  //       private _bookService : BookService, 
  //       private _authService : AuthService,
  //       private _orderService : OrderService,
  //       private _router : Router
  //     ) {}

  // ngOnInit() : void {
  //   this._bookService.getAll().subscribe({
  //     next : (res) => {
  //       // console.log('NEXT', res);
  //       this.listBooks = res.results;
  //       this.countBooks = res.count;
  //     }
  //   })
  //   this._authService.userId$.subscribe((userId : string | null) => {
  //     this.userId = userId;
  //     console.log(this.userId);
      
  //   })
  //   this._orderService.getAll().subscribe({
  //     next : (res) => {
  //       console.log('RES : ', res);
        
  //     }
  //   })
  // }
}
