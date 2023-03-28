import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifica } from '../models/notifica.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificaService {

  constructor(private http: HttpClient) { }

  creaNotifica(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/notifiche',
      data
    );
  }

  eliminaNotifica(id: number): Observable<Notifica> {
    return this.http.delete<Notifica>(`http://localhost:8080/api/notifiche/${id}`)
  }
}
