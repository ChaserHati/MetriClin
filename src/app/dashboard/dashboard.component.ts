import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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
