import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { DatePipe } from '@angular/common';

import { ApiEvaluacionService,CreateEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';

@Component({
  selector: 'app-evaluacion',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './evaluacion.component.html',
  providers: [provideNativeDateAdapter(),DatePipe],
  styleUrl: './evaluacion.component.css'
})
export class EvaluacionComponent {

  //variables

  rut:string='';

  picker_fecha_eval:Date|null=null;
  fecha_eval:string='';
  descripcion:string='';
  peso:number|null=null;
  talla:number|null=null;

  plBicipital:number|null=null;
  plTricipital:number|null=null;
  plSubescapular:number|null=null;
  plCrestaIliaca:number|null=null;
  plEspinaIliaca:number|null=null;
  plAbdominal:number|null=null;
  plMuslo:number|null=null;
  plPantorrilla:number|null=null;

  perBrazo:number|null=null;
  perBrazoFlex:number|null=null;
  perCintura:number|null=null;
  perCadera:number|null=null;
  perMuslo:number|null=null;
  perPantorrilla:number|null=null;

  diaHumero:number|null=null;
  diaMuneca:number|null=null;
  diaFemur:number|null=null;

  constructor(private apiEvaluacionService:ApiEvaluacionService,private datePipe:DatePipe){}

//metodos

  setEvaluacion(){
    const newEvaluacion: CreateEvaluacion = {
      fecha_evaluacion: this.fecha_eval,
      descripcion: this.descripcion,
      peso: this.peso??0,
      talla: this.talla??0,
      pli_bicipital: this.plBicipital??0,
      pli_tricipital: this.plTricipital??0,
      pli_subescapular: this.plSubescapular??0,
      pli_cresta_iliaca: this.plCrestaIliaca??0,
      pli_espina_iliaca: this.plEspinaIliaca??0,
      pli_abdominal: this.plAbdominal??0,
      pli_muslo: this.plMuslo??0,
      pli_pantorrilla: this.plPantorrilla??0,
      per_brazo: this.perBrazo??0,
      per_brazo_flex: this.perBrazoFlex??0,
      per_cintura: this.perCintura??0,
      per_cadera: this.perCadera??0,
      per_muslo: this.perMuslo??0,
      per_pantorrilla: this.perPantorrilla??0,
      diametro_humero: this.diaHumero??0,
      diametro_muneca: this.diaMuneca??0,
      diametro_femur: this.diaFemur??0,
      //se necesitan formulas aqui
      cod_imc: 0,
      cod_grasa_corporal: 0,
      cod_masa_muscular: 0
    }
    return newEvaluacion;
  }

  crearEvaluacion() {
    this.apiEvaluacionService.createEvaluacion(this.rut, this.setEvaluacion()).subscribe({
      next: respuesta => {
        console.log('Evaluación creada:', respuesta);
      },
      error: error => {
        console.error('Error al crear evaluación:', error);
      }
    })
  }
  //---
  onDateChange(event: any) {
    console.log("Confirmando fecha: ",this.picker_fecha_eval)
    if (this.picker_fecha_eval instanceof Date) {
      console.log("Confirmando que es tipo Date:",this.picker_fecha_eval instanceof Date)
      const fecha_con_pipe = this.formatDate(this.picker_fecha_eval);
      if(fecha_con_pipe!==null) {
        console.log("Confirmando que no es null:",fecha_con_pipe!==null)
        this.fecha_eval = fecha_con_pipe;
        console.log("Fecha despues del pipe: ", this.fecha_eval);
      }
    }

  }
  formatDate(date: Date): string | null {
    console.log("convertiendo Date a string")
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  //---
}
