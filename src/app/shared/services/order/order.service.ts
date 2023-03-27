import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderResult, OrderResultArray } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orderUrl : string = 'http://localhost:8080/api/order/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<OrderResultArray> { 
    return this._httpClient.get<OrderResultArray>(this._orderUrl);
  }

  getById(id: number) : Observable<OrderResult> { 
    return this._httpClient.get<OrderResult>(this._orderUrl + id);
  }

  create(orderToAdd: Order) : Observable<OrderResult> { 
    return this._httpClient.post<OrderResult>(this._orderUrl, orderToAdd);
  }

  update(id: number, orderToUpdate: Order) : Observable<any> { 
    return this._httpClient.put(this._orderUrl + id, orderToUpdate);
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._orderUrl + id);
  }
}
