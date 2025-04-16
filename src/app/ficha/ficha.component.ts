import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-ficha',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, MatCheckboxModule],
  templateUrl: './ficha.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './ficha.component.css'
})
export class FichaComponent {
  evaluations = [
    { title: 'Ev 3', date: '01-01-2025', selected: true },
    { title: 'Ev 2', date: '01-01-2024', selected: false },
    { title: 'Ev 1', date: '01-01-2023', selected: false },
  ];
}