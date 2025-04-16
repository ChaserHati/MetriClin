import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export interface ReadEvaluacion {
  nro_evaluacion: number;
  fecha_evaluacion: string;
  descripcion: string;
  peso: number;
  talla: number;
  pli_bicipital: number;
  pli_tricipital: number;
  pli_subescapular: number;
  pli_cresta_iliaca: number;
  pli_espina_iliaca: number;
  pli_abdominal: number;
  pli_muslo: number;
  pli_pantorrilla: number;
  per_brazo: number;
  per_brazo_flex: number;
  per_cintura: number;
  per_cadera: number;
  per_muslo: number;
  per_pantorrilla: number;
  diametro_humero: number;
  diametro_muneca: number;
  diametro_femur: number;
  cod_imc: number;
  cod_grasa_corporal: number;
  cod_masa_muscular: number;
}

export interface CreateEvaluacion {
  fecha_evaluacion: string;
  descripcion: string;
  peso: number;
  talla: number;
  pli_bicipital: number;
  pli_tricipital: number;
  pli_subescapular: number;
  pli_cresta_iliaca: number;
  pli_espina_iliaca: number;
  pli_abdominal: number;
  pli_muslo: number;
  pli_pantorrilla: number;
  per_brazo: number;
  per_brazo_flex: number;
  per_cintura: number;
  per_cadera: number;
  per_muslo: number;
  per_pantorrilla: number;
  diametro_humero: number;
  diametro_muneca: number;
  diametro_femur: number;
  cod_imc: number;
  cod_grasa_corporal: number;
  cod_masa_muscular: number;
}

export interface UpdateEvaluacion {
  fecha_evaluacion: string;
  descripcion: string;
  peso: number;
  talla: number;
  pli_bicipital: number;
  pli_tricipital: number;
  pli_subescapular: number;
  pli_cresta_iliaca: number;
  pli_espina_iliaca: number;
  pli_abdominal: number;
  pli_muslo: number;
  pli_pantorrilla: number;
  per_brazo: number;
  per_brazo_flex: number;
  per_cintura: number;
  per_cadera: number;
  per_muslo: number;
  per_pantorrilla: number;
  diametro_humero: number;
  diametro_muneca: number;
  diametro_femur: number;
  cod_imc: number;
  cod_grasa_corporal: number;
  cod_masa_muscular: number;
}


@Injectable({
  providedIn: 'root'
})
export class ApiEvaluacionService {

  // private apiUrl = 'https://metriclin-back-production.up.railway.app/api/evaluacion';
  private apiUrl = 'http://localhost:3000/api/evaluacion';
  private http = inject(HttpClient);

  constructor() { }

  getEvaluacionesByRut(rut: string): Observable<ReadEvaluacion[]> {
    return this.http.get<any[][]>(`${this.apiUrl}/${rut}`).pipe(
      map(res =>
        res.map(evaluacion => ({
          nro_evaluacion: evaluacion[0],
          fecha_evaluacion: evaluacion[1],
          descripcion: evaluacion[2],
          peso: evaluacion[3],
          talla: evaluacion[4],
          pli_bicipital: evaluacion[5],
          pli_tricipital: evaluacion[6],
          pli_subescapular: evaluacion[7],
          pli_cresta_iliaca: evaluacion[8],
          pli_espina_iliaca: evaluacion[9],
          pli_abdominal: evaluacion[10],
          pli_muslo: evaluacion[11],
          pli_pantorrilla: evaluacion[12],
          per_brazo: evaluacion[13],
          per_brazo_flex: evaluacion[14],
          per_cintura: evaluacion[15],
          per_cadera: evaluacion[16],
          per_muslo: evaluacion[17],
          per_pantorrilla: evaluacion[18],
          diametro_humero: evaluacion[19],
          diametro_muneca: evaluacion[20],
          diametro_femur: evaluacion[21],
          cod_imc: evaluacion[22],
          cod_grasa_corporal: evaluacion[23],
          cod_masa_muscular: evaluacion[24]
        }))
      )
    );
  }

  getEvaluacionByNroAndRut(rut: string, nro_eva: number): Observable<ReadEvaluacion> {
    return this.http.get<any[]>(`${this.apiUrl}/${rut}/${nro_eva}`).pipe(
      map(res => ({
        nro_evaluacion: res[0],
        fecha_evaluacion: res[1],
        descripcion: res[2],
        peso: res[3],
        talla: res[4],
        pli_bicipital: res[5],
        pli_tricipital: res[6],
        pli_subescapular: res[7],
        pli_cresta_iliaca: res[8],
        pli_espina_iliaca: res[9],
        pli_abdominal: res[10],
        pli_muslo: res[11],
        pli_pantorrilla: res[12],
        per_brazo: res[13],
        per_brazo_flex: res[14],
        per_cintura: res[15],
        per_cadera: res[16],
        per_muslo: res[17],
        per_pantorrilla: res[18],
        diametro_humero: res[19],
        diametro_muneca: res[20],
        diametro_femur: res[21],
        cod_imc: res[22],
        cod_grasa_corporal: res[23],
        cod_masa_muscular: res[24]
      }))
    );
  }

  createEvaluacion(rut: string, infoUser: CreateEvaluacion) {
    return this.http.post(`${this.apiUrl}/${rut}`, infoUser);
  }

  updateEvaluacion(rut: string, nro_ev: number, infoUser: UpdateEvaluacion) {
    return this.http.put(`${this.apiUrl}/${rut}/${nro_ev}`, infoUser)
  }

  deleteEvaluacion(rut: string, nro_ev: number) {
    return this.http.delete(`${this.apiUrl}/${rut}/${nro_ev}`)
  }



}
