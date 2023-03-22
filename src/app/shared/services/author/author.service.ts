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

  create(authorToAdd: Author, file : File) : Observable<AuthorResult> {
    // console.log(authorToAdd.birthdate);
    // console.log(typeof (authorToAdd.birthdate));
    
    let formData : FormData = new FormData();
    formData.append('firstname', authorToAdd.firstname);
    formData.append('lastname', authorToAdd.lastname);
    formData.append('birthdate', authorToAdd.birthdate);
    formData.append('biography', authorToAdd.biography);
    formData.append('photo', file, file.name);

    return this._httpClient.post<AuthorResult>(this._authorUrl, formData);
  }

  update(id: number, authorToUpdate: Author) : Observable<any> {
    return this._httpClient.put(this._authorUrl + id,authorToUpdate);
  }

  delete(id: number) : Observable<any> {
    return this._httpClient.delete(this._authorUrl + id);
  }

}
