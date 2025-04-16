import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ApiEvaluacionService, ReadEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';

@Component({
  selector: 'app-verevaluacion',
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatSidenavModule, MatIconModule],
  templateUrl: './verevaluacion.component.html',
  styleUrl: './verevaluacion.component.css'
})
export class VerevaluacionComponent {
evaluacion: ReadEvaluacion = {
    nro_evaluacion: 0,
    fecha_evaluacion: '',
    descripcion: '',
    peso: 0,
    talla: 0,
    pli_bicipital: 0,
    pli_tricipital: 0,
    pli_subescapular: 0,
    pli_cresta_iliaca: 0,
    pli_espina_iliaca: 0,
    pli_abdominal: 0,
    pli_muslo: 0,
    pli_pantorrilla: 0,
    per_brazo: 0,
    per_brazo_flex: 0,
    per_cintura: 0,
    per_cadera: 0,
    per_muslo: 0,
    per_pantorrilla: 0,
    diametro_humero: 0,
    diametro_muneca: 0,
    diametro_femur: 0,
    cod_imc: 0,
    cod_grasa_corporal: 0,
    cod_masa_muscular: 0
  };

  isDisabled: boolean = true;

  rut: string='';
  constructor(private apiEvaluacionService: ApiEvaluacionService) { }

  ngOnInit(): void {
    this.apiEvaluacionService.getEvaluacionesByRut(this.rut).subscribe(res=>{
      this.evaluacion = res[0];

    })
  }
}
