import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campo } from '../models/campo.interface';
import { CentroSportivo } from '../models/centro-sportivo.interface';
import { Provincia } from '../models/provincia.interface';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};





@Injectable({
  providedIn: 'root'
})
export class CentroSportivoService {



  constructor(private http: HttpClient) { }

  creaCentroSportivo(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/centri-sportivi',
      data,
      httpOptions
    );
  }

  getCampi(): Observable<Campo[]> {
    return this.http.get<Campo[]>('http://localhost:8080/api/campi');
  }

  getCentriSportivi(): Observable<CentroSportivo[]> {
    return this.http.get<CentroSportivo[]>('http://localhost:8080/api/centri-sportivi');
  }

  getCentriSportiviCitta(provincia: number): Observable<CentroSportivo[]> {
    return this.http.get<CentroSportivo[]>('http://localhost:8080/api/centri-sportivi/cerca-citta?citta=' + provincia);
  }

}
