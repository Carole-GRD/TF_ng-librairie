import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre, GenreResult, GenreResultArray } from '../../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private _genreUrl : string = 'http://localhost:8080/api/genre/';

  constructor( private _httpClient: HttpClient ) { }

  getAll() : Observable<GenreResultArray> { 
    return this._httpClient.get<GenreResultArray>(this._genreUrl);
  }

  getById(id: number) : Observable<GenreResult> { 
    return this._httpClient.get<GenreResult>(this._genreUrl + id);
  }

  create(genreToAdd: Genre) : Observable<GenreResult> { 
    return this._httpClient.post<GenreResult>(this._genreUrl, genreToAdd);
  }

  update(id: number, genreToUpdate: Genre) : Observable<any> { 
    return this._httpClient.put(this._genreUrl + id, genreToUpdate);
  }

  delete(id: number) : Observable<any> { 
    return this._httpClient.delete(this._genreUrl + id);
  }
}
