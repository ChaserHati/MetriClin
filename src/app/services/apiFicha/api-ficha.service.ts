import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CreateFicha {
  rut: string;
  descripcion: string;
  diagnostico: string;
  objetivo: string;
  tratamiento: string;
  fecha_ingreso: string;
  fecha_prox_sesion: string;
}
export interface ReadFicha {
  rut: string;
  descripcion: string;
  diagnostico: string;
  objetivo: string;
  tratamiento: string;
  fecha_ingreso: string;
  fecha_prox_sesion: string;
}
export interface UpdateFicha {
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

  getFichaByRut(rut: string): Observable<ReadFicha> {
    return this.http.get<any[]>(`${this.apiUrl}/${rut}`).pipe(
      map(res => ({
        rut: res[0],
        descripcion: res[1],
        diagnostico: res[2],
        objetivo: res[3],
        tratamiento: res[4],
        fecha_ingreso: res[5],
        fecha_prox_sesion: res[6],
      }))
    )
  }

  createFicha(infoFicha: CreateFicha) {
    return this.http.post(this.apiUrl, infoFicha);
  }

  updateFicha(rut: string, infoFicha: UpdateFicha) {
    return this.http.put(`${this.apiUrl}/${rut}`, infoFicha)
  }

  deleteFicha(rut: string) {
    return this.http.delete(`${this.apiUrl}/${rut}`)
  }

}
