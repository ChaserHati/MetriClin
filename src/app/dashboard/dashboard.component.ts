import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Users {
  rut: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nac: string;
  correo: string;
  num_celular: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // private apiUrl = 'http://localhost:3000/api/user';
  private apiUrl = 'https://metriclin-back-production.up.railway.app/api/user';
  private http = inject(HttpClient);

  getUsers(): Observable<Users[]> {
    return this.http.get<any[][]>(this.apiUrl).pipe(
      map(res =>
        res.map(usu => ({
          rut: usu[0],
          nombre: usu[1],
          ap_paterno: usu[2],
          ap_materno: usu[3],
          fecha_nac: usu[4],
          correo: usu[5],
          num_celular: usu[6],
        }))
      )
    );
  }

  usuarios: Users[] = [];

  ngOnInit(): void {

    this.getUsers().subscribe(user => {
      this.usuarios = user;
    });

  }

  cards = [
    { title: 'Card 1', content: 'This is card 1' },
    { title: 'Card 2', content: 'This is card 2' },
    { title: 'Card 3', content: 'This is card 3' },
    { title: 'Card 4', content: 'This is card 4' },
    { title: 'Card 5', content: 'This is card 5' },
    { title: 'Card 6', content: 'This is card 6' },
    { title: 'Card 7', content: 'This is card 7' },
    { title: 'Card 8', content: 'This is card 8' },
  ];

}
