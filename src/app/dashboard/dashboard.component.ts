import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service';
import { Router } from '@angular/router';
import { NavmenuComponent } from '../components/navmenu/navmenu.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule,
    MatFormFieldModule, MatIconModule, MatSidenavModule, NavmenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private apiUserService: ApiUserService, private router: Router) { }

  usuarios: ReadUser[] = [];
  rutev: string = '';

  crearUsuario() {
    const infoNewUser = {
      rut: '18123123',
      dv_rut: 'K',
      nombre: 'Testing',
      ap_paterno: 'Desde',
      ap_materno: 'Front',
      fecha_nac: '05-05-2025',
      sexo: 'masculino',
      password: 'string123',
      correo: 'testing@gmail.com',
      num_celular: 987687687,
      rut_evaluador: '15123123',
      cod_rol: 3,
      cod_comuna: 1
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

  ngOnInit(): void {
    this.rutev = localStorage.getItem('rutuser') ?? '';
    this.apiUserService.getUsers(this.rutev).subscribe(user => {
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
