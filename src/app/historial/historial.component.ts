import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiEvaluacionService, ReadEvaluacionArr } from '../services/apiEvaluacion/api-evaluacion.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  //variables
  rut: string = '';
  evaluaciones: ReadEvaluacionArr[] = [];
  //constructor
  constructor(private apiEvalService: ApiEvaluacionService, private router: Router, private route: ActivatedRoute) { }

  //lifecycle hooks
  ngOnInit() {
    this.rut = this.route.snapshot.paramMap.get('id') ?? ''

  }
  //metodos
  ir_a_evaluacion(rut: string, nro: number) {
    this.router.navigate(['/evaluacion/'], {
      queryParams: {
        rut: rut,
        nro: nro
      }
    });
  }

}
