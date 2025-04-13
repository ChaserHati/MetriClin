import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()],
  styleUrl: './evaluacion.component.css'
})
export class EvaluacionComponent {

peso:number=0;
talla:number=0;

plBicipital:number=0;
plTricipital:number=0;
plSubescapular:number=0;
plCrestaIliaca:number=0;
plEspinaIliaca:number=0;
plAbdominal:number=0;
plMuslo:number=0;
plPantorrilla:number=0;

perBrazo:number=0;
perCintura:number=0;
perCadera:number=0;
perMuslo:number=0;
perPantorrilla:number=0;

diaHumero:number=0;
diaMuneca:number=0;
diaFemur:number=0;

}
