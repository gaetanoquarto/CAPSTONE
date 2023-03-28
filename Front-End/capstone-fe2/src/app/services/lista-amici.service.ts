import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amico } from '../models/amico.interface';
import { UtenteAmico } from '../models/utente-amico.interface';

@Injectable({
  providedIn: 'root'
})
export class ListaAmiciService {

  constructor(private http: HttpClient) { }

  creaAmico(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/amici',
      data
    );
  }

  creaUtenteAmico(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/utenti-amici',
      data
    );
  }

  getAmico(id: number): Observable<Amico> {
    return this.http.get<Amico>(`http://localhost:8080/api/amici/${id}`)
  }

  getAllAmici(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/amici`)
  }


  getUtenteAmico(id: number): Observable<UtenteAmico> {
    return this.http.get<UtenteAmico>(`http://localhost:8080/api/amici/${id}`)
  }


}
