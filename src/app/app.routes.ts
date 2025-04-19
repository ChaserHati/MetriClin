import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { HistorialComponent } from './historial/historial.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'ficha', component: FichaComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'evaluacion', component: EvaluacionComponent},
    { path: '', component: InicioComponent },        // Página de inicio
    { path: 'login', component: LoginComponent },    // Página de login
    { path: 'registro', component: RegistroComponent }, // Página de registro

];
