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
import { ApiFichaService,ReadFicha } from '../services/apiFicha/api-ficha.service';
import { ApiEvaluacionService, ReadEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, MatCheckboxModule,FormsModule],
  templateUrl: './ficha.component.html',
  providers: [provideNativeDateAdapter(),DatePipe],
  styleUrl: './ficha.component.css'
})
export class FichaComponent {
  //variables
  rut:string='';

  user: ReadUser = {
    rut: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    fecha_nac: new Date(),
    correo: '',
    num_celular: 0
  }

  ficha: ReadFicha = {
    descripcion: '',
    diagnostico: '',
    objetivo: '',
    tratamiento: '',
    fecha_ingreso: '',
    fecha_prox_sesion: ''
  };
  evaluaciones: ReadEvaluacion[] = [];
  
  //constructor
  constructor(private apiFichaService:ApiFichaService,private apiUserService:ApiUserService,private apiEvalService:ApiEvaluacionService,
    private datePipe:DatePipe,private router:Router, private route:ActivatedRoute){}
  //lifecycle hooks
  ngOnInit(){
    this.rut=this.route.snapshot.paramMap.get('id')??'';
    this.apiUserService.getUserByRut(this.rut).subscribe((user: ReadUser) => {
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

  ir_a_historial(rut:string){
    this.router.navigate(['/evaluacion',rut]);
  }
  ir_a_evaluacion(rut:string,nro:number){
    this.router.navigate(['/evaluacion/'],{
      queryParams: {
        rut: rut,
        nro: nro
      }
    });
  }

}