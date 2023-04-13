import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partita } from '../models/partita.interface';
import { Campo } from '../models/campo.interface';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {

  constructor(private http: HttpClient) { }

  getListaPartite(): Observable<Partita[]> {
    return this.http.get<Partita[]>('http://localhost:8080/api/partite');
  }

  creaPartita(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/partite',
      data
    );
  }

  getPartitaById(id: number): Observable<Partita> {
    return this.http.get<Partita>(`http://localhost:8080/api/partite/${id}`)
  }

  aggiornaPartita(id: number, partita: Partita): Observable<any> {
    return this.http.put(`http://localhost:8080/api/partite/${id}`, partita);
  }

  getListaPartiteFilter(citta: string, giorno: string): Observable<Partita[]> {
    return this.http.get<Partita[]>(`http://localhost:8080/api/partite/ricerca?citta=${citta}&giorno=${giorno}`);
  }

  eliminaPartita(id: number): Observable<Partita> {
    return this.http.delete<Partita>(`http://localhost:8080/api/partite/${id}`)
  }

  getListaCampi(): Observable<Campo[]> {
    return this.http.get<Campo[]>(`http://localhost:8080/api/campi`)
  }
}
