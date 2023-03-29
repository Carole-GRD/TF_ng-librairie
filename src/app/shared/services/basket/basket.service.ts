import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order, OrderResult } from '../../models/order';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _orderUrl : string = 'http://localhost:8080/api/order/';

  private _currentOrder : Order | null = null;
  private _currentOrder$ : BehaviorSubject<Order | null> = new BehaviorSubject(this._currentOrder);

  currentOrder$ : Observable<Order | null> = this._currentOrder$.asObservable();

  constructor(
      private _httpClient : HttpClient
  ) { }

  getCurrentOrder() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._httpClient.get<OrderResult>(this._orderUrl + `user/${userId}/current`).subscribe({
        next : (res) => {
          this._currentOrder = res.result;
          this._currentOrder$.next(res.result);
        },
        // si pas de commande en attente -> erreur 404 (cette requête échoue)
        // erreur gérée par "error"
        error : (err) => {
          if (err.status === 404) {
            console.log('ERREUR : pas de commande "En attente". Gérée par "error dans subscribe. (message de la méthode getCurrentOrder() du fichier basket.service.ts)', err);
            
          }
        }
      })
    }
  }

  deleteOrder() {
    this._currentOrder = null;
    this._currentOrder$.next(null);
  }
}