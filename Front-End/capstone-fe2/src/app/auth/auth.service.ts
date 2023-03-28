import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';


const url = 'http://localhost:8080/auth/login/';

 const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storagesrv: StorageService) {}

  login(user: {user: any, username: string, password: string}): Observable<any> {
    return this.http.post(
      url,
      user,
      httpOptions
    );
  }



  register(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/auth/registrazione',
      data,
      httpOptions
    );
  }

  logout() {
    this.storagesrv.clean();
  }

}
