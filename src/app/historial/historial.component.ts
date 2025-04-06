import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-historial',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  cards = [
    { title: 'Card 1', content: 'This is card 1' },
    { title: 'Card 2', content: 'This is card 2' },
    { title: 'Card 3', content: 'This is card 3' },
    { title: 'Card 4', content: 'This is card 4' },
    { title: 'Card 5', content: 'This is card 5' },
    { title: 'Card 6', content: 'This is card 6' },
    { title: 'Card 7', content: 'This is card 7' },
    { title: 'Card 8', content: 'This is card 8' },
    { title: 'Card 9', content: 'This is card 9' },
    { title: 'Card 0', content: 'This is card 0' },
  ];

}
