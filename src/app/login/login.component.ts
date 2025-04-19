import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavegaComponent } from '../navega/navega.component';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatButtonModule
    , FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule,NavegaComponent 
   ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Aquí va la lógica para validar el login
      console.log('Usuario:', username, 'Contraseña:', password);
    }
  }
}