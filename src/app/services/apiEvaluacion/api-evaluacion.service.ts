import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export interface ReadEvaluacionObj {
  nro_evaluacion: number[];
  fecha_evaluacion: number[];
  peso: number[];
  talla: number[];
  pli_bicipital: number[];
  pli_tricipital: number[];
  pli_subescapular: number[];
  pli_cresta_iliaca: number[];
  pli_espina_iliaca: number[];
  pli_abdominal: number[];
  pli_muslo: number[];
  pli_pantorrilla: number[];
  per_brazo: number[];
  per_brazo_flex: number[];
  per_cintura: number[];
  per_cadera: number[];
  per_muslo: number[];
  per_pantorrilla: number[];
  diametro_codo: number[];
  diametro_muneca: number[];
  diametro_rodilla: number[];
}

export interface ReadEvaluacionArr {
  nro_evaluacion: number;
  fecha_evaluacion: string;
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

  getEvaluacionesByRutFilter(rut: string): Observable<ReadEvaluacionObj> {
    return this.http.get<any>(`${this.apiUrl}/${rut}`).pipe(
      map(res => ({
        nro_evaluacion: res[0],
        fecha_evaluacion: res[1],
        peso: res[2],
        talla: res[3],
        pli_bicipital: res[4],
        pli_tricipital: res[5],
        pli_subescapular: res[6],
        pli_cresta_iliaca: res[7],
        pli_espina_iliaca: res[8],
        pli_abdominal: res[9],
        pli_muslo: res[10],
        pli_pantorrilla: res[11],
        per_brazo: res[12],
        per_brazo_flex: res[13],
        per_cintura: res[14],
        per_cadera: res[15],
        per_muslo: res[16],
        per_pantorrilla: res[17],
        diametro_codo: res[18],
        diametro_muneca: res[19],
        diametro_rodilla: res[20]
      }))
    );
  }

  getEvaluacionesByRutAll(rut: string): Observable<ReadEvaluacionArr[]> {
    return this.http.get<any[][]>(`${this.apiUrl}/all/${rut}`).pipe(
      map(res =>
        res.map(evaluacion => ({
          nro_evaluacion: evaluacion[0],
          fecha_evaluacion: evaluacion[1],
          peso: evaluacion[2],
          talla: evaluacion[3],
          pli_bicipital: evaluacion[4],
          pli_tricipital: evaluacion[5],
          pli_subescapular: evaluacion[6],
          pli_cresta_iliaca: evaluacion[7],
          pli_espina_iliaca: evaluacion[8],
          pli_abdominal: evaluacion[9],
          pli_muslo: evaluacion[10],
          pli_pantorrilla: evaluacion[11],
          per_brazo: evaluacion[12],
          per_brazo_flex: evaluacion[13],
          per_cintura: evaluacion[14],
          per_cadera: evaluacion[15],
          per_muslo: evaluacion[16],
          per_pantorrilla: evaluacion[17],
          diametro_humero: evaluacion[18],
          diametro_muneca: evaluacion[19],
          diametro_femur: evaluacion[20]
          // cod_imc: evaluacion[21],
          // cod_grasa_corporal: evaluacion[22],
          // cod_masa_muscular: evaluacion[23]
        }))
      )
    );
  }


  getEvaluacionByNroAndRut(rut: string, nro_eva: number): Observable<ReadEvaluacionArr> {
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
