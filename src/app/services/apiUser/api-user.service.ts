import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ReadUser {
  rut: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nac: Date;
  sexo: string;
  correo: string;
  num_celular: number;
  rut_evaluador: string;
}

export interface CreateUser {
  rut: string;
  dv_rut: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nac: string;
  sexo: string;
  contrasena: string;
  correo: string;
  num_celular: number;
  rut_evaluador: string;
  cod_rol: number;
  cod_comuna: number;
}

export interface UpdateUser {
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nac: string;
  contrasena: string;
  correo: string;
  num_celular: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  // private apiUrl = 'https://metriclin-back-production.up.railway.app/api/user';
  private apiUrl = 'http://localhost:3000/api/user';
  private http = inject(HttpClient);

  constructor() { }


  getUsers(): Observable<ReadUser[]> {
    return this.http.get<any[][]>(this.apiUrl).pipe(
      map(res =>
        res.map(usu => ({
          rut: usu[0],
          nombre: usu[1],
          ap_paterno: usu[2],
          ap_materno: usu[3],
          fecha_nac: new Date(usu[4]),
          sexo: usu[5],
          correo: usu[6],
          num_celular: usu[7],
          rut_evaluador: usu[8]
        }))
      )
    );
  }


  getUserByRut(rut: string): Observable<ReadUser> {
    return this.http.get<any[]>(`${this.apiUrl}/${rut}`).pipe(
      map(res => ({
        rut: res[0],
        nombre: res[1],
        ap_paterno: res[2],
        ap_materno: res[3],
        fecha_nac: new Date(res[4]),
        sexo: res[5],
        correo: res[6],
        num_celular: res[7],
        rut_evaluador: res[8]
      }))
    );
  }

  createUser(infoUser: CreateUser) {
    return this.http.post(this.apiUrl, infoUser);
  }

  updateUser(rut: string, infoUser: UpdateUser) {
    return this.http.put(`${this.apiUrl}/${rut}`, infoUser)
  }

  deleteUser(rut: string) {
    return this.http.delete(`${this.apiUrl}/${rut}`)
  }

}
