import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NavegaComponent } from '../navega/navega.component';

@Component({
  selector: 'app-cred-informe',
  imports: [MatFormFieldModule, MatInputModule,FormsModule,MatButtonModule,NavegaComponent],
  templateUrl: './cred-informe.component.html',
  styleUrl: './cred-informe.component.css'
})
export class CredInformeComponent {
//variables
rut:string = '';
nro:number = 0;
//constructor
constructor(private router: Router) {}
//metodo
  ir_ver_informe(rut:string,nro: number) {
    localStorage.setItem('rutpaciente',rut);
    this.router.navigate(['/ver-informe', nro]);
  }
}
