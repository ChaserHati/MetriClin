import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiUserService, CreateUser } from '../services/apiUser/api-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevopaciente',
  imports: [MatIconModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule],
  templateUrl: './nuevopaciente.component.html',
  providers: [provideNativeDateAdapter(),DatePipe
  ],
  styleUrl: './nuevopaciente.component.css'
})
export class NuevopacienteComponent {

  rut: string='';
  dv_rut: string='';
  nombre: string  = '';
  ap_paterno: string = '';
  ap_materno: string = '';
  picker_fecha_nac: Date|null = null;
  fecha_nac: string = '';
  contrasena: string = '';
  correo: string = '';
  num_celular: number|null=null;
  cod_comuna: number|null=null;

  constructor(private apiUserService:ApiUserService, private datePipe:DatePipe){}

  setUser(){
    const newUser:CreateUser={
      rut: this.rut,
      dv_rut: this.dv_rut,
      nombre: this.nombre,
      ap_paterno: this.ap_paterno,
      ap_materno: this.ap_materno,
      fecha_nac: this.fecha_nac,
      contrasena: this.contrasena,
      correo: this.correo,
      num_celular: this.num_celular ?? 0,
      cod_rol: 0,
      cod_comuna: this.cod_comuna ?? 0,
    }
    return newUser;
  }

  testUsuarioCreado(){
    console.log("Usuario creado: ", this.setUser());
  }

  crearUsuario() {
    this.apiUserService.createUser(this.setUser()).subscribe({
      next: respuesta => {
        console.log('Usuario creado:', respuesta);
      },
      error: error => {
        console.error('Error al crear usuario:', error);
      }
    })
  }
  //---
  onDateChange(event: any) {
    console.log("Confirmando fecha: ",this.picker_fecha_nac)
    if (this.picker_fecha_nac instanceof Date) {
      console.log("Confirmando que es tipo Date:",this.picker_fecha_nac instanceof Date)
      const fecha_con_pipe = this.formatDate(this.picker_fecha_nac);
      if(fecha_con_pipe!==null) {
        console.log("Confirmando que no es null:",fecha_con_pipe!==null)
        this.fecha_nac = fecha_con_pipe;
        console.log("Fecha despues del pipe: ", this.fecha_nac);
      }
    }

  }

  formatDate(date: Date): string | null {
    console.log("convertiendo Date a string")
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  //---
}
