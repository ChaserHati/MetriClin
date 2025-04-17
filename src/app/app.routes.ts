import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { HistorialComponent } from './historial/historial.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { TestServiceComponent } from './test-service/test-service.component';
import { NuevopacienteComponent } from './nuevopaciente/nuevopaciente.component';
import { VerevaluacionComponent } from './verevaluacion/verevaluacion.component';

export const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'ficha', component: FichaComponent },
    { path: 'historial', component: HistorialComponent },
    { path: 'evaluacion', component: EvaluacionComponent },
    {path: 'verevaluacion', component: VerevaluacionComponent},
    {path: 'nuevopaciente', component: NuevopacienteComponent},

    { path: 'test-service', component: TestServiceComponent },
];
