import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storagesrv: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser: any = window.sessionStorage.getItem('auth-user');

    if(authUser) {
      const  parseAuthUser = JSON.parse(authUser);
      const token = parseAuthUser.token;

      if(token){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });
      } else {
        console.log("errore")
      }
    } else {
      console.log("errore")
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
