import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResult, UserResultArray } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userUrl : string = 'http://localhost:8080/api/user/';

  constructor(private _httpClient : HttpClient) { }

  getAll() : Observable<UserResultArray> {
    return this._httpClient.get<UserResultArray>(this._userUrl);
  }

  getById(id: number) : Observable<UserResult> {
    return this._httpClient.get<UserResult>(this._userUrl + id);
  }

  create(userToAdd: User, file : File) : Observable<UserResult> {
    // console.log(authorToAdd.birthdate);
    // console.log(typeof (authorToAdd.birthdate));
    if (file) {
      let formData : FormData = new FormData();
      formData.append('firstname', userToAdd.firstname);
      formData.append('lastname', userToAdd.lastname);
      formData.append('pseudo', userToAdd.pseudo);
      formData.append('email', userToAdd.email);
      formData.append('password', userToAdd.password);
      formData.append('role', userToAdd.role);
      formData.append('avatar', file, file.name);
      return this._httpClient.post<UserResult>(this._userUrl, formData);
    }
    else {
      return this._httpClient.post<UserResult>(this._userUrl, userToAdd);
    }
  }

  update(id: number, userToUpdate: User, file : File) : Observable<any> {

    if (file) {
      let formData : FormData = new FormData();
      formData.append('firstname', userToUpdate.firstname);
      formData.append('lastname', userToUpdate.lastname);
      formData.append('pseudo', userToUpdate.pseudo);
      formData.append('email', userToUpdate.email);
      formData.append('password', userToUpdate.password);
      formData.append('role', userToUpdate.role);
      formData.append('avatar', file, file.name);
      return this._httpClient.put(this._userUrl + id, formData);
    }
    else {
      return this._httpClient.put(this._userUrl + id, userToUpdate);
    }
  }

  delete(id: number) : Observable<any> {
    return this._httpClient.delete(this._userUrl + id);
  }

}
