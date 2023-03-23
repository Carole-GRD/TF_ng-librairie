import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher, PublisherResult, PublisherResultArray } from '../../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private _publisherUrl : string = 'http://localhost:8080/api/publisher/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<PublisherResultArray> { 
    return this._httpClient.get<PublisherResultArray>(this._publisherUrl);
  }

  getById(id: number) : Observable<PublisherResult> { 
    return this._httpClient.get<PublisherResult>(this._publisherUrl + id);
  }

  create(publisherToAdd: Publisher) : Observable<PublisherResult> { 
    return this._httpClient.post<PublisherResult>(this._publisherUrl, publisherToAdd);
  }

  update(id: number, publisherToUpdate: Publisher) : Observable<any> { 
    return this._httpClient.put(this._publisherUrl + id, publisherToUpdate);
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._publisherUrl + id);
  }
}
