import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ficha {
  descripcion: string;
  diagnostico: string;
  objetivo: string;
  tratamiento: string;
  fecha_ingreso: string;
  fecha_prox_sesion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiFichaService {

  // private apiUrl = 'https://metriclin-back-production.up.railway.app/api/ficha';
  private apiUrl = 'http://localhost:3000/api/ficha';
  private http = inject(HttpClient);

  constructor() { }

  getFichaByRut(rut: string): Observable<Ficha> {
    return this.http.get<any[]>(`${this.apiUrl}/${rut}`).pipe(
      map(res => ({
        descripcion: res[0],
        diagnostico: res[1],
        objetivo: res[2],
        tratamiento: res[3],
        fecha_ingreso: res[4],
        fecha_prox_sesion: res[5],
      }))
    )
  }
}
