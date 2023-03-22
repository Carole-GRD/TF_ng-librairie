import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorResultArray, AuthorResult, Author } from '../../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private _authorUrl : string = 'http://localhost:8080/api/author/';

  constructor(private _httpClient : HttpClient) { }

  getAll() : Observable<AuthorResultArray> {
    return this._httpClient.get<AuthorResultArray>(this._authorUrl);
  }

  getById(id: number) : Observable<AuthorResult> {
    return this._httpClient.get<AuthorResult>(this._authorUrl + id);
  }

  create(artistToAdd: Author) : Observable<AuthorResult> {
    return this._httpClient.post<AuthorResult>(this._authorUrl, artistToAdd);
  }

  update(id: number, artistToUpdate: Author) : Observable<any> {
    return this._httpClient.put(this._authorUrl + id, artistToUpdate);
  }

  delete(id: number) : Observable<any> {
    return this._httpClient.delete(this._authorUrl + id);
  }

}
