import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.interface';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) { }

  getUtente(id: number): Observable<Utente[]> {
    return this.http.get<Utente[]>(`http://localhost:8080/api/utenti/${id}`);
  }
}
