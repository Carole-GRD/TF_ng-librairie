import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { Order } from 'src/app/shared/models/order';
import { BookService } from 'src/app/shared/services/book/book.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  listOrders : Order[] = [];
  countOrders! : number;
  listBooks : Book[] = [];
  totalEdition : number = 0;
  totalOrder : number = 0;


  constructor(
        private _orderService : OrderService, 
        private _bookService : BookService,
        private _router : Router
      ) {}

  ngOnInit() : void {
    this._orderService.getAll().subscribe({
      next : (res) => {
        
        this.listOrders = res.results;
        this.countOrders = res.count;

        for (let editions of this.listOrders) {
          // console.log(editions);
          
          for (let edition of editions.Editions) {
            console.log('edition.price', edition.price);
            console.log('edition.quantity', edition.quantity);
            this.totalEdition = edition.price * edition.quantity;
            console.log('totalEdition : ', this.totalEdition);
            this.totalOrder += this.totalEdition;
          }
          console.log('totalOrder : ', this.totalOrder.toFixed(2));
          
        }  
      }
    })
  }

  deleteOrder(id: number) {
    this._orderService.delete(id).subscribe({
      error : (error) => {
        if (error.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      },
      complete : () => {
        this._orderService.getAll().subscribe((res) => { this.listOrders = res.results; this.countOrders = res.count; });
      }
    })
  }

}
