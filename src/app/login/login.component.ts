import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavegaComponent } from '../navega/navega.component';
import { MatError } from '@angular/material/form-field';
import { AuthService } from '../services/apiAuth/auth.service';
import { Router } from '@angular/router';

interface TokenResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
    , FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, NavegaComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      rutuser: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { rutuser, password } = this.loginForm.value;
      const indexDv = rutuser.indexOf('-');
      const rutSinDv = rutuser.slice(0, indexDv);
      const infoauth = {
        rut: rutSinDv,
        password: password
      }
      // Aquí va la lógica para validar el login
      this.authService.login(infoauth).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          localStorage.setItem('rutuser', rutSinDv);
          this.router.navigate(['/dashboard']);
          console.log('Usuario autenticado, la respuesta es:', res.token);
        },
        error: error => {
          console.error('Error al autenticar usuario:', error);
        }
      })
    }
  }
}