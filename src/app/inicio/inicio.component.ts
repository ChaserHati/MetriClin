import { Component } from '@angular/core';
import { LogoMetriclinComponent } from '../logo/logo.component';

import { NavegaComponent } from '../navega/navega.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-inicio',
  standalone: true, 
  imports: [LogoMetriclinComponent, NavegaComponent,CommonModule], // Importando otros componentes
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  logoPath = 'assets/images/logoMetriclin.png';
}
