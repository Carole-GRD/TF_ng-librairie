import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatResultArray, FormatResult, Format } from '../../models/format'

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private _formatUrl : string = 'http://localhost:8080/api/format/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<FormatResultArray> { 
    return this._httpClient.get<FormatResultArray>(this._formatUrl);
  }

  getById(id: number) : Observable<FormatResult> { 
    return this._httpClient.get<FormatResult>(this._formatUrl + id);
  }

  create(formatToAdd: Format) : Observable<FormatResult> { 
    return this._httpClient.post<FormatResult>(this._formatUrl, formatToAdd);
  }

  update(id: number, formatToUpdate: Format) : Observable<any> { 
    return this._httpClient.put(this._formatUrl + id, formatToUpdate);
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._formatUrl + id);
  }
}
