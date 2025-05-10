import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFichaService } from '../services/apiFicha/api-ficha.service';
import { Control } from '../services/apiFicha/api-ficha.service';
import { NavmenuComponent } from '../components/navmenu/navmenu.component';
import { MatSidenavModule } from '@angular/material/sidenav';

interface Sesion {
  nombre: string,
  ap_paterno: string,
  ap_materno: string,
  rut: string,
}
interface Calendario {
  dia: string,
  sesion: Sesion[],
}

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, NavmenuComponent, MatSidenavModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {

  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  hours: string[] = [];

  calendario: Calendario[] = [
    {
      dia: 'Lunes',
      sesion: []
    },
    {
      dia: 'Martes',
      sesion: []
    },
    {
      dia: 'Miercoles',
      sesion: []
    },
    {
      dia: 'Jueves',
      sesion: []
    },
    {
      dia: 'Viernes',
      sesion: []
    }
  ]

  constructor(private apiFichaService: ApiFichaService) {
    for (let i = 9; i <= 20; i++) {
      const hour = i <= 12 ? `${i} AM` : `${i - 12} PM`;
      this.hours.push(hour);
    }
  }

  info: Control[] = [
    {
      nombre: 'string',
      ap_paterno: 'string',
      ap_materno: 'string',
      rut: '',
      fecha_prox_sesion: '',
    }
  ];

  ngOnInit() {
    this.apiFichaService.getFichaProxControl('5-5-2025', '11-5-2025').subscribe((info) => {

      this.info = info;

      info.map(inf => {
        let fechaSesion = new Date(inf.fecha_prox_sesion).getDay();
        if (fechaSesion == 1) {
          this.calendario[0].sesion.push({ nombre: inf.nombre, ap_paterno: inf.ap_paterno, ap_materno: inf.ap_materno, 'rut': inf.rut })
        } else if (fechaSesion == 2) {
          this.calendario[1].sesion.push({ nombre: inf.nombre, ap_paterno: inf.ap_paterno, ap_materno: inf.ap_materno, 'rut': inf.rut })
        } else if (fechaSesion == 3) {
          this.calendario[2].sesion.push({ nombre: inf.nombre, ap_paterno: inf.ap_paterno, ap_materno: inf.ap_materno, 'rut': inf.rut })
        } else if (fechaSesion == 4) {
          this.calendario[3].sesion.push({ nombre: inf.nombre, ap_paterno: inf.ap_paterno, ap_materno: inf.ap_materno, 'rut': inf.rut })
        } else if (fechaSesion == 5) {
          this.calendario[4].sesion.push({ nombre: inf.nombre, ap_paterno: inf.ap_paterno, ap_materno: inf.ap_materno, 'rut': inf.rut })
        }
      })

    });


  }



}
