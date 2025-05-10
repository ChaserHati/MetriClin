import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  form: FormGroup;
  mensaje: string = '';

  profesionales = [
    { id: 1, nombre: 'Alvaro' },
    { id: 2, nombre: 'Catalina' },
    { id: 3, nombre: 'Darren' }
  ];

  todasLasHoras: string[] = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00'
  ];

  horasReservadas: { fecha: string, hora: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dkK]$/)]],
      fecha: ['', Validators.required],
      profesional: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  get horasDisponibles(): string[] {
    const fechaSeleccionada = this.form.get('fecha')?.value;
    if (!fechaSeleccionada) return this.todasLasHoras;

    const horasOcupadas = this.horasReservadas
      .filter(r => r.fecha === fechaSeleccionada)
      .map(r => r.hora);

    return this.todasLasHoras.filter(hora => !horasOcupadas.includes(hora));
  }

esDiaHabil = (fecha: string): boolean => {
  const dia = new Date(fecha).getDay();
  return dia !== 0 && dia !== 6; 
}


  tomarHora() {
     const fecha = this.form.get('fecha')?.value;
  if (fecha && !this.esDiaHabil(fecha)) {
    this.mensaje = 'No se pueden reservar horas los sábados ni domingos.';
    return;
  }
    if (this.form.valid) {
      const datos = this.form.value;

      this.horasReservadas.push({
        fecha: datos.fecha,
        hora: datos.hora
      });

      this.mensaje = `Hora reservada para ${datos.nombre} con ${datos.profesional} el ${datos.fecha} a las ${datos.hora}.`;
      this.form.reset();
    } else {
      this.mensaje = 'Formulario incompleto o inválido.';
    }
  }
}
