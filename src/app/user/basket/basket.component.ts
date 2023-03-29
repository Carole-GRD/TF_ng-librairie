import { Component, OnInit } from '@angular/core';
import { Edition } from 'src/app/shared/models/edition';
import { Order } from 'src/app/shared/models/order';
import { BasketService } from 'src/app/shared/services/basket/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  
  order! : Order | null;
  sousTotal : number[] = [];
  total : number = 0;


  constructor(
        private _basketService : BasketService
    ) {}


  ngOnInit(): void {
    this._basketService.currentOrder$.subscribe({
      next : (res) => {
        console.log(res);
        this.order = res;
        if (this.order?.Editions) {
          for (let edition of this.order?.Editions) {
            this.sousTotal.push(edition.price * edition.quantity);       
          }
          this.total = this.sousTotal.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
          console.log(this.total);
        }
      }
    })
  }
}
