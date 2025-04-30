import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ApiEvaluacionService, CreateEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';

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
  providers: [provideNativeDateAdapter(), DatePipe],
  styleUrl: './evaluacion.component.css'
})
export class EvaluacionComponent {

  //variables

  rut: string = '';
  picker_fecha_eval: Date = new Date();
  fecha_eval: string = '';
  descripcion: string = '';
  peso: number = 0;
  talla: number = 0;

  plBicipital: number = 0;
  plTricipital: number = 0;
  plSubescapular: number = 0;
  plCrestaIliaca: number = 0;
  plEspinaIliaca: number = 0;
  plAbdominal: number = 0;
  plMuslo: number = 0;
  plPantorrilla: number = 0;

  perBrazo: number = 0;
  perBrazoFlex: number = 0;
  perCintura: number = 0;
  perCadera: number = 0;
  perMuslo: number = 0;
  perPantorrilla: number = 0;

  diaHumero: number = 0;
  diaMuneca: number = 0;
  diaFemur: number = 0;

  constructor(private apiEvaluacionService: ApiEvaluacionService, private datePipe: DatePipe,
    private router: Router, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.rut = this.actRouter.snapshot.paramMap.get('id') ?? '';
    console.log(this.rut);
  }

  //metodos

  fechaString(date: Date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  }

  setEvaluacion() {
    const newEvaluacion: CreateEvaluacion = {
      fecha_evaluacion: this.fechaString(this.picker_fecha_eval),
      descripcion: this.descripcion,
      peso: this.peso ?? 0,
      talla: this.talla ?? 0,
      pli_bicipital: this.plBicipital ?? 0,
      pli_tricipital: this.plTricipital ?? 0,
      pli_subescapular: this.plSubescapular ?? 0,
      pli_cresta_iliaca: this.plCrestaIliaca ?? 0,
      pli_espina_iliaca: this.plEspinaIliaca ?? 0,
      pli_abdominal: this.plAbdominal ?? 0,
      pli_muslo: this.plMuslo ?? 0,
      pli_pantorrilla: this.plPantorrilla ?? 0,
      per_brazo: this.perBrazo ?? 0,
      per_brazo_flex: this.perBrazoFlex ?? 0,
      per_cintura: this.perCintura ?? 0,
      per_cadera: this.perCadera ?? 0,
      per_muslo: this.perMuslo ?? 0,
      per_pantorrilla: this.perPantorrilla ?? 0,
      diametro_humero: this.diaHumero ?? 0,
      diametro_muneca: this.diaMuneca ?? 0,
      diametro_femur: this.diaFemur ?? 0,
      cod_imc: 3,
      cod_grasa_corporal: 3,
      cod_masa_muscular: 3
    }
    return newEvaluacion;
  }

  crearEvaluacion() {
    this.apiEvaluacionService.createEvaluacion(this.rut, this.setEvaluacion()).subscribe({
      next: respuesta => {
        console.log('Evaluación creada:', respuesta);
        alert('evaluación creada');
        this.router.navigate(['/dashboard']);

      },
      error: error => {
        console.error('Error al crear evaluación:', error);
      }
    })
  }

  onDateChange(event: any) {
    console.log("Confirmando fecha: ", this.picker_fecha_eval)
    if (this.picker_fecha_eval instanceof Date) {
      console.log("Confirmando que es tipo Date:", this.picker_fecha_eval instanceof Date)
      const fecha_con_pipe = this.formatDate(this.picker_fecha_eval);
      if (fecha_con_pipe !== null) {
        console.log("Confirmando que no es null:", fecha_con_pipe !== null)
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
