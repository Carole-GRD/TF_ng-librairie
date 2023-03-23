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
    if (file) {
      let formData : FormData = new FormData();
      formData.append('firstname', authorToAdd.firstname);
      formData.append('lastname', authorToAdd.lastname);
      formData.append('birthdate', authorToAdd.birthdate.toString());
      formData.append('biography', authorToAdd.biography);
      formData.append('photo', file, file.name);
      return this._httpClient.post<AuthorResult>(this._authorUrl, formData);
    }
    else {
      return this._httpClient.post<AuthorResult>(this._authorUrl, authorToAdd);
    }
  }

  update(id: number, authorToUpdate: Author, file : File) : Observable<any> {

    if (file) {
      let formData : FormData = new FormData();
      formData.append('firstname', authorToUpdate.firstname);
      formData.append('lastname', authorToUpdate.lastname);
      formData.append('birthdate', authorToUpdate.birthdate.toString());
      formData.append('biography', authorToUpdate.biography);
      formData.append('photo', file, file.name);
      return this._httpClient.put(this._authorUrl + id, formData);
    }
    else {
      return this._httpClient.put(this._authorUrl + id, authorToUpdate);
    }
    

  }

  delete(id: number) : Observable<any> {
    return this._httpClient.delete(this._authorUrl + id);
  }

}
