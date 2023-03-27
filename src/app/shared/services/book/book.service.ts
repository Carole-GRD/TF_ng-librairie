import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookAuthorUpdate, BookResult, BookResultArray, BookUpdate } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _bookUrl : string = 'http://localhost:8080/api/book/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<BookResultArray> { 
    return this._httpClient.get<BookResultArray>(this._bookUrl);
  }

  getById(id: number) : Observable<BookResult> { 
    return this._httpClient.get<BookResult>(this._bookUrl + id);
  }

  create(bookToAdd: Book) : Observable<BookResult> { 
    return this._httpClient.post<BookResult>(this._bookUrl, bookToAdd);
  }

  update(id: number, bookToUpdate: BookUpdate) : Observable<any> { 
    return this._httpClient.put(this._bookUrl + id, bookToUpdate);
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._bookUrl + id);
  }

  authorcreate(id : number, authorcreate : BookAuthorUpdate) : Observable<any> {
    return this._httpClient.put(this._bookUrl + id + '/authorcreate', authorcreate);
  }

  authordelete(bookId : number, listAuthors : BookAuthorUpdate) : Observable<any> {
    
    return this._httpClient.put(this._bookUrl + bookId + '/authordelete', listAuthors);
  }
}
