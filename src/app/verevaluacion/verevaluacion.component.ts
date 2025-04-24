import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiEvaluacionService, ReadEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service';

@Component({
  selector: 'app-verevaluacion',
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './verevaluacion.component.html',
  styleUrl: './verevaluacion.component.css'
})
export class VerevaluacionComponent {
  //definimos objetos que contendran los datos
  rut: string = '';
  nro: number = 1;
  user: ReadUser = {
    rut: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    fecha_nac: new Date(),
    sexo: '',
    correo: '',
    num_celular: 0,
    rut_evaluador: ''
  }
  evaluacion: ReadEvaluacion = {
    nro_evaluacion: 0,
    fecha_evaluacion: '',
    descripcion: '',
    peso: 9,
    talla: 0,
    pli_bicipital: 0,
    pli_tricipital: 0,
    pli_subescapular: 0,
    pli_cresta_iliaca: 0,
    pli_espina_iliaca: 0,
    pli_abdominal: 0,
    pli_muslo: 0,
    pli_pantorrilla: 0,
    per_brazo: 0,
    per_brazo_flex: 0,
    per_cintura: 0,
    per_cadera: 0,
    per_muslo: 0,
    per_pantorrilla: 0,
    diametro_humero: 0,
    diametro_muneca: 0,
    diametro_femur: 0,
    cod_imc: 0,
    cod_grasa_corporal: 0,
    cod_masa_muscular: 0
  }
  isDisabled: boolean = true;

  //formulas para obtener indicadores físicos
  imc() {
    let peso = this.evaluacion.peso;
    let talla = this.evaluacion.talla;
    let imc = peso / (talla / 100) ** 2;
    imc = parseFloat(imc.toFixed(1));
    return imc;
  }
  grasaCorporalPorcentaje() {
    let eva = this.evaluacion;
    let sexo = this.user.sexo;
    let suma6p = eva.pli_tricipital + eva.pli_subescapular + eva.pli_espina_iliaca + eva.pli_abdominal + eva.pli_muslo + eva.pli_pantorrilla;
    let grasaCorporal = 0;
    if (sexo === 'masculino') {
      grasaCorporal = 0.1051 * suma6p + 2.58;
    } else if (sexo === 'femenino') {
      grasaCorporal = 0.1548 * suma6p + 3.58;
    }
    grasaCorporal = parseFloat(grasaCorporal.toFixed(0));
    return grasaCorporal;
  }
  grasaCorporalKg() {
    let grasaPorc = this.grasaCorporalPorcentaje();
    let peso = this.evaluacion.peso;
    let grasaCorporal = (grasaPorc * peso) / 100;
    grasaCorporal = parseFloat(grasaCorporal.toFixed(1))
    return grasaCorporal;
  }
  masaMuscularKg() {
    let eva = this.evaluacion;
    let talla = eva.talla;
    let perBrazoCorregido = eva.per_brazo - ((eva.pli_tricipital / 10) * 3.14);
    let perMusloCorregido = eva.per_muslo - ((eva.pli_muslo / 10) * 3.14);
    let perPiernaCorregido = eva.per_pantorrilla - ((eva.pli_pantorrilla / 10) * 3.14);
    let edad = 30;
    let masaMuscular = (talla / 100) * (0.00744 * (perBrazoCorregido ** 2) + 0.00088 * (perMusloCorregido ** 2) + 0.00441 * (perPiernaCorregido ** 2)) + 2.4 * 1 - 0.048 * edad + 0 + 7.8;
    masaMuscular = parseFloat(masaMuscular.toFixed(1));
    return masaMuscular;
  }
  masaMuscularPorcentaje() {
    let musculoKg = this.masaMuscularKg();
    let masaMuscular = (musculoKg * 100) / this.evaluacion.peso;
    masaMuscular = parseFloat(masaMuscular.toFixed(0));
    return masaMuscular;
  }

  //método constructor 
  constructor(private apiEvaluacionService: ApiEvaluacionService,
    private apiUserService: ApiUserService, private route: ActivatedRoute, private router: Router) { }

  //ngOnInit - ejecuta esto en el primer renderizado del componente
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.rut = params.get('id') ?? '10123123';
      this.nro = Number(params.get('nro') ?? 1)
    });
    this.apiEvaluacionService.getEvaluacionByNroAndRut(this.rut, this.nro).subscribe((evaluacion: ReadEvaluacion) => {
      this.evaluacion = evaluacion;
    })
    this.apiUserService.getUserByRut(this.rut).subscribe((user: ReadUser) => {
      this.user = user;
    })
    this.imc();
    this.grasaCorporalPorcentaje();
    this.grasaCorporalKg();
    this.masaMuscularKg();
    this.masaMuscularPorcentaje();

  }

}
