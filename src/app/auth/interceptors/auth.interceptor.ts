import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // request : contient la requête interceptée
    // next : Permet de continuer la requête

    // vérifier si on a un token
    let token : string | null = localStorage.getItem('token');

    // Si oui, le rajouter dans les headers et continuer la requête
    if (token && token != '') {
      // On clone la requête et on rajoute dans les headers et on continue la requête (clonée)
      let requestClone = request.clone({ setHeaders : { "Authorization" : `Bearer ${token}` } });
      return next.handle(requestClone);
    }

    // Si pas, on continue la requête
    return next.handle(request);
    
  }
}
