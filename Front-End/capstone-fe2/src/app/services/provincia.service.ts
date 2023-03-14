import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient) { }

  getProvince(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>('http://localhost:8080/api/province');
  }
}
