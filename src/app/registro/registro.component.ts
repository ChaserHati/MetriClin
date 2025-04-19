import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NavegaComponent } from '../navega/navega.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule ,
    MatButtonModule,
     MatDatepickerModule,
     MatNativeDateModule,
      MatIconModule ,NavegaComponent ],

  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
  
})
export class RegistroComponent {
  registroForm: FormGroup;



  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['',[ Validators.required,Validators.email]],
      contrasena: ['', Validators.required],
      celular: ['', Validators.required],
    });
  }
  registrar() {
     console.log(this.registroForm.value)
    }
  }


