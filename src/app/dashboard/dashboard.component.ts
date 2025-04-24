import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service'; //import servicios e interfaces
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private apiUserService: ApiUserService, private router: Router) { } //inicializa el servicio

  usuarios: ReadUser[] = []; //variable que contendra los datos

  crearUsuario() {
    const infoNewUser = {
      rut: '18123123',
      dv_rut: 'K',
      nombre: 'Testing',
      ap_paterno: 'Desde',
      ap_materno: 'Front',
      fecha_nac: '05-05-2025',
      sexo: 'masculino',
      contrasena: 'string123',
      correo: 'testing@gmail.com',
      num_celular: 987687687,
      rut_evaluador: '15123123',
      cod_rol: 3,
      cod_comuna: 1
    }
    // this.apiUserService.createUser(infoNewUser);
    this.apiUserService.createUser(infoNewUser).subscribe({
      next: respuesta => {
        console.log('Usuario creado:', respuesta);
      },
      error: error => {
        console.error('Error al crear usuario:', error);
      }
    })
  }

  ngOnInit(): void {
    //llama el método get del servicio users y guarda los datos obtenidos en la variable usuarios
    this.apiUserService.getUsers().subscribe(user => {
      this.usuarios = user;
    });
  }

  ir_a_paciente(rut: string) {
    this.router.navigate(['/ficha', rut]);
  }
  ir_a_nuevo_paciente() {
    this.router.navigate(['/nuevopaciente']);
  }


}
