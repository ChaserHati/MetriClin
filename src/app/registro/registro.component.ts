import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NavegaComponent } from '../navega/navega.component';
import { ApiUserService, CreateUser } from '../services/apiUser/api-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    NavegaComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private apiUserService: ApiUserService) {
    this.registroForm = this.fb.group({
      rut: ['', Validators.required],
      dv: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: [null],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      celular: ['', Validators.required],
    });
  }
  registrar() {
    const { rut, dv, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, correo, password, celular } = this.registroForm.value;

    // const newFechaNac = new Date(fechaNacimiento).toISOString();
    const dia = String(fechaNacimiento.getDate()).padStart(2, '0');
    const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, '0');
    const anio = fechaNacimiento.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    let infoNewUser = {
      rut: rut,
      dv_rut: dv,
      nombre: nombre,
      ap_paterno: apellidoPaterno,
      ap_materno: apellidoMaterno,
      fecha_nac: fechaFormateada,
      sexo: sexo,
      contrasena: password,
      correo: correo,
      num_celular: celular,
      rut_evaluador: '',
      cod_rol: 2,
      cod_comuna: 1,
    }
    this.apiUserService.createUser(infoNewUser).subscribe({
      next: respuesta => {
        console.log('Usuario creado:', respuesta);
      },
      error: error => {
        console.error('Error al crear usuario:', error);
      }
    })
  }
}


