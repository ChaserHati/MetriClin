import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';

export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'ficha', component: FichaComponent},
];
