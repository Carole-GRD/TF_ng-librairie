import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Order } from 'src/app/shared/models/order';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  isConnected : boolean = false;
  userRole! : string | null;
  userId! : string | null;
  listOrderId : number[] = [];
  panier : number = 0;

  constructor(
        private _authService : AuthService,
        private _orderService : OrderService,
        private _basketService : BasketService,
        private _route : Router
      ) {}

  ngOnInit(): void {
    this._authService.isConnected$.subscribe((connectionState : boolean) => {
      console.log('ETAT DE CONNEXION : ', connectionState);
      this.isConnected = connectionState;
      if (!this.isConnected) {
        this._route.navigateByUrl('/');
      }
    })
    this._authService.userRole$.subscribe((userRole : string | null) => {
      this.userRole = userRole;
    })
    this._authService.userId$.subscribe((userId : string | null) => {
      this.userId = userId;
    })
    // this._orderService.getAll().subscribe({
    //   next : (res) => {
    //     for (let order of res.results) {
    //       if (order.User?.id.toString() === this.userId) {
    //         if (order.status === 'En attente') {
    //           // console.log(order.Editions.length);
    //           this.panier = order.Editions.length;
    //         }
    //       };
    //     }
    //   }
    // })
    this._basketService.currentOrder$.subscribe({
      next : (res) => { 
        if (res) {
          console.log(res);
          this.panier = res.Editions.length;
        }
        else {
          this.panier = 0;
        }
      }
    })
    this._basketService.getCurrentOrder();


  }

  disConnect() : void {
    this._authService.logout();
  }
}
