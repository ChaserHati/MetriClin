import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service';
import { ApiFichaService, CreateFicha, ReadFicha, UpdateFicha } from '../services/apiFicha/api-ficha.service';
import { ApiEvaluacionService, ReadEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatCardModule, MatCheckboxModule, FormsModule],
  templateUrl: './ficha.component.html',
  providers: [provideNativeDateAdapter(), DatePipe],
  styleUrl: './ficha.component.css'
})
export class FichaComponent {
  //variables
  rut: string = '';
  rutev: string = '';
  user: ReadUser = {
    rut: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    fecha_nac: new Date(),
    sexo: '',
    correo: '',
    num_celular: 0,
    rut_evaluador: ''
  }
  ficha: ReadFicha = {
    rut: '',
    descripcion: '',
    diagnostico: '',
    objetivo: '',
    tratamiento: '',
    fecha_ingreso: '',
    fecha_prox_sesion: ''
  };

  evaluaciones: ReadEvaluacion[] = [];

  //constructor
  constructor(private apiFichaService: ApiFichaService, private apiUserService: ApiUserService,
    private apiEvalService: ApiEvaluacionService, private datePipe: DatePipe, private router: Router,
    private route: ActivatedRoute) { }
  //lifecycle hooks
  ngOnInit() {
    console.log(new Date)
    this.rut = this.route.snapshot.paramMap.get('id') ?? '';
    this.rutev = localStorage.getItem('rutuser') ?? '';
    this.apiUserService.getUserByRut(this.rutev, this.rut).subscribe((user: ReadUser) => {
      this.user = user;
    });
    this.apiFichaService.getFichaByRut(this.rut).subscribe((ficha: ReadFicha) => {
      this.ficha = ficha;
    });
    this.apiEvalService.getEvaluacionesByRut(this.rut).subscribe((evaluaciones: ReadEvaluacion[]) => {
      this.evaluaciones = evaluaciones;
    });
  }
  //metodos

  navEvaluacion() {
    this.router.navigate(['/evaluacion', this.user.rut])
  }

  ir_a_historial(rut: string) {
    this.router.navigate(['/evaluacion', rut]);
  }
  ir_a_evaluacion(rut: string, nro: number) {
    this.router.navigate(['/evaluacion/'], {
      queryParams: {
        rut: rut,
        nro: nro
      }
    });
  }

  fechaString(date: Date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  }

  guardarFicha() {
    if (this.ficha.rut === '') {
      console.log('ficha null')
      let createFicha: CreateFicha = {
        rut: this.rut,
        descripcion: this.ficha.descripcion ?? '',
        diagnostico: this.ficha.diagnostico ?? '',
        objetivo: this.ficha.objetivo ?? '',
        tratamiento: this.ficha.tratamiento ?? '',
        fecha_ingreso: this.fechaString(new Date(this.ficha.fecha_ingreso)) ?? this.fechaString(new Date()),
        fecha_prox_sesion: this.fechaString(new Date(this.ficha.fecha_prox_sesion)) ?? this.fechaString(new Date())
      }
      this.apiFichaService.createFicha(createFicha).subscribe(() => {
        console.log('ficha creada');
        alert('ficha creada');
      })
    } else {
      let updatedFicha: UpdateFicha = {
        descripcion: this.ficha.descripcion ?? '',
        diagnostico: this.ficha.diagnostico ?? '',
        objetivo: this.ficha.objetivo ?? '',
        tratamiento: this.ficha.tratamiento ?? '',
        fecha_ingreso: this.fechaString(new Date(this.ficha.fecha_ingreso)) ?? this.fechaString(new Date()),
        fecha_prox_sesion: this.fechaString(new Date(this.ficha.fecha_prox_sesion)) ?? this.fechaString(new Date())
      }
      this.apiFichaService.updateFicha(this.rut, updatedFicha).subscribe(() => {
        console.log('ficha actualizada')
        alert('ficha actualizada');
      })

    }


  }

}