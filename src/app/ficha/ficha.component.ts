import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-ficha',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './ficha.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './ficha.component.css'
})
export class FichaComponent {

}
