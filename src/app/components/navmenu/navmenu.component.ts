import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/apiAuth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  imports: [CommonModule, MatButtonModule, MatSidenavModule, MatIconModule],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})
export class NavmenuComponent {

  constructor(private router: Router, private authService: AuthService) { }



  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  navDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navCalendario() {
    this.router.navigate(['/calendario'])
  }

}
