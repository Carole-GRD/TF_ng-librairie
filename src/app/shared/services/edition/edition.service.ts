import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Edition, EditionCreateUpdate, EditionResult, EditionResultArray } from '../../models/edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  private _editionUrl : string = 'http://localhost:8080/api/edition/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<EditionResultArray> { 
    return this._httpClient.get<EditionResultArray>(this._editionUrl);
  }

  getById(id: number) : Observable<EditionResult> { 
    return this._httpClient.get<EditionResult>(this._editionUrl + id);
  }

  create(editionToAdd: EditionCreateUpdate, file : File) : Observable<EditionResult> { 
    if (file) {
      let formData : FormData = new FormData();
      formData.append('ISBN', editionToAdd.ISBN);
      formData.append('price', editionToAdd.price.toString());
      formData.append('stock', editionToAdd.stock.toString());
      formData.append('PublisherId', editionToAdd.PublisherId.toString());
      formData.append('FormatId', editionToAdd.FormatId.toString());
      formData.append('BookId', editionToAdd.BookId.toString());
      formData.append('cover', file, file.name);
      return this._httpClient.post<EditionResult>(this._editionUrl, formData);
    }
    else {
      return this._httpClient.post<EditionResult>(this._editionUrl, editionToAdd);
    }
  }

  update(id: number, editionToUpdate: EditionCreateUpdate, file : File) : Observable<any> { 
    if (file) {
      let formData : FormData = new FormData();
      formData.append('ISBN', editionToUpdate.ISBN);
      formData.append('price', editionToUpdate.price.toString());
      formData.append('stock', editionToUpdate.stock.toString());
      formData.append('PublisherId', editionToUpdate.PublisherId.toString());
      formData.append('FormatId', editionToUpdate.FormatId.toString());
      formData.append('BookId', editionToUpdate.BookId.toString());
      formData.append('cover', file, file.name);
      return this._httpClient.put(this._editionUrl + id, formData);
    }
    else {
      return this._httpClient.put(this._editionUrl + id, editionToUpdate);
    }
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._editionUrl + id);
  }
}
