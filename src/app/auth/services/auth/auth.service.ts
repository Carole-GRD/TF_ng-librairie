import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { AuthResult } from '../../models/auth.result';
import { Login } from '../../models/login';
import { Register } from '../../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = 'http://localhost:8080/api/auth/';

  private _isConnected$ : BehaviorSubject<boolean> = new BehaviorSubject(localStorage.getItem('token') && localStorage.getItem('token') != '' ? true : false);
  private _userRole$ : BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('userRole'));
  private _userId$ : BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('userId'));

  // asObservable permet de transformer un Subject ou Behavior en simple Observable
  // ainsi, les composants pourront juste s'abonner à lui, mais c'est le service qui se charge de next une nouvelle valeur
  isConnected$ : Observable<boolean> = this._isConnected$.asObservable();
  userRole$ : Observable<string | null> = this._userRole$.asObservable();
  userId$ : Observable<string | null> = this._userId$.asObservable();

  constructor(private _httpClient : HttpClient,
      private _basketService : BasketService
    ) { }

  register(register : Register, file : File) : Observable<AuthResult> {
    if (file) {
      let formData : FormData = new FormData();
      formData.append('firstname', register.firstname);
      formData.append('lastname', register.lastname);
      formData.append('pseudo', register.pseudo);
      formData.append('email', register.email);
      formData.append('password', register.password);
      // formData.append('role', register.role);
      formData.append('avatar', file, file.name);
      return this._httpClient.post<AuthResult>(this._authUrl, formData);
    }
    else {
      return this._httpClient.post<AuthResult>(this._authUrl + 'register', register);
    }
  }

  login(login : Login) : Observable<AuthResult> {
    return this._httpClient.post<AuthResult>(this._authUrl + 'login', login);
  }

  logout() : void {
    localStorage.clear();
    this._userRole$.next(null);
    // Si on stocke d'autres valeurs que l'on veut garder
      // -> localStorage.removeItem('token') - pareil avec userId et userRole
    this._isConnected$.next(false);
    this._basketService.deleteOrder();
  }

  connect() : void {
    this._userRole$.next(localStorage.getItem('userRole'));
    this._userId$.next(localStorage.getItem('userId'));
    this._isConnected$.next(true);
    this._basketService.getCurrentOrder();
  }
}
