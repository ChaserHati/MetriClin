import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { HistorialComponent } from './historial/historial.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { NuevopacienteComponent } from './nuevopaciente/nuevopaciente.component';
import { VerevaluacionComponent } from './verevaluacion/verevaluacion.component';
import { VerinformeComponent } from './verinforme/verinforme.component';
import { AuthGuard } from './services/guards/auth.guard';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { CredInformeComponent } from './cred-informe/cred-informe.component';
import { AgendaComponent } from './agenda/agenda.component';

export const routes: Routes = [

    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'ficha', component: FichaComponent, canActivate: [AuthGuard] },
    { path: 'ficha/:id', component: FichaComponent, canActivate: [AuthGuard] },
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },
    { path: 'historial/:id', component: HistorialComponent, canActivate: [AuthGuard] },
    { path: 'evaluacion', component: EvaluacionComponent, canActivate: [AuthGuard] },
    { path: 'evaluacion/:id', component: EvaluacionComponent, canActivate: [AuthGuard] },
    { path: 'verevaluacion', component: VerevaluacionComponent, canActivate: [AuthGuard] },
    { path: 'verevaluacion/:id/:nro', component: VerevaluacionComponent, canActivate: [AuthGuard] },
    { path: 'ver-informe/:id', component: VerinformeComponent, canActivate: [AuthGuard] },
    { path: 'nuevopaciente', component: NuevopacienteComponent, canActivate: [AuthGuard] },
    { path: 'pdf', component: PdfGeneratorComponent }
];

