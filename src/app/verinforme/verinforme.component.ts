import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RedirectCommand } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiEvaluacionService, ReadEvaluacionObj, ReadEvaluacionArr } from '../services/apiEvaluacion/api-evaluacion.service';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-verinforme',
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatSidenavModule, MatIconModule, MatButtonModule, CanvasJSAngularChartsModule],
  templateUrl: './verinforme.component.html',
  styleUrl: './verinforme.component.css'
})
export class VerinformeComponent {
  //definimos objetos que contendran los datos
  rut: string = '';
  rutev: string = '';
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
  evaluacion: ReadEvaluacionArr = {
    nro_evaluacion: 0,
    fecha_evaluacion: '',
    peso: 0,
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
    // // cod_imc: 0,
    // cod_grasa_corporal: 0,
    // cod_masa_muscular: 0
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

  //codigo de graficos

  chart_imc: any;
  chart_kg: any;
  chart_perc: any;
  chart_perimetro: any;
  chart_pliegue: any;

  generate_imc_chart(imc: number) {
    return {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "IMC"
      },
      axisX: {
        labelFormatter: () => " ",
        tickLength: 0,
        lineThickness: 0
      },
      axisY: {
        interval: 5,
      },
      data: [
        {
          type: "rangeBar",
          dataPoints: [
            { x: 0, y: [0, 18.4], label: "Bajo Peso", color: "#00BFFF" },
            { x: 0, y: [18.5, 24.9], label: "Normal", color: "#32CD32" },
            { x: 0, y: [25, 29.9], label: "Sobrepeso", color: "#FFD700" },
            { x: 0, y: [30, 34.9], label: "Obeso I", color: "#FF8C00" },
            { x: 0, y: [35, 40], label: "Obeso II", color: "#FF4500" },
          ]
        },
        {
          type: "rangeBar",
          dataPoints: [
            { x: 0, y: [imc - 0.5, imc + 0.5], label: "IMC", indexLabel: "⯅", color: "#000000", toolTipContent: `IMC: ${imc.toFixed(1)}` },
          ]
        }]
    }
  }

  generate_chart_kg(masa_muscular_kg: number, grasa_corporal_kg: number, peso_kg: number) {
    return {
      title: {
        text: "Componentes Corporales (KG)"
      },
      animationEnabled: true,
      data: [{
        type: "column",
        dataPoints: [
          { x: 10, y: masa_muscular_kg, label: 'Masa Muscular (kg)' },
          { x: 20, y: grasa_corporal_kg, label: 'Grasa Corporal (kg)' },
          { x: 30, y: peso_kg, label: 'Peso (kg)' },
        ]
      }]
    }
  }

  generate_chart_perc(mm: number, gc: number, oc: number) {
    return {
      animationEnabled: true,
      title: {
        text: "Componentes Corporales (%)"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: mm, name: "Masa Muscular (%)" },
          { y: gc, name: "Grasa Corporal (%)" },
          { y: oc, name: "Otros Componentes (%)" },
        ]
      }]
    }
  }

  generate_chart_perimetro(evaluaciones: any) {
    const etiquetas = ["Brazo Relajado", "Brazo Flexionado", "Cintura", "Cadera", "Muslo", "Pantorrilla"];
    const campos = ["per_brazo", "per_braz_flex", "per_cintura", "per_cadera", "per_muslo", "per_pantorrilla"];

    const dataSeries = [];

    for (let i = 0; i < evaluaciones[campos[0]].length; i++) {
      const puntos = campos.map((campo, j) => ({
        y: evaluaciones[campo][i],
        label: etiquetas[j]
      }));

      dataSeries.push({
        type: "bar",
        name: `Evaluación ${i + 1}`,
        showInLegend: true,
        dataPoints: puntos
      });
    }

    return {
      animationEnabled: true,
      title: {
        text: "Perímetros (cm)"
      },
      axisY: {
        includeZero: true
      },
      legend: {
        cursor: "pointer"
      },
      data: dataSeries
    };
  }
  generate_chart_pliegue(evaluaciones: any) {
    const etiquetas = [
      "Bicipital", "Tricipital", "Subescapular", "Cresta Iliaca",
      "Espina Iliaca", "Abdomen", "Muslo", "Pantorrilla"
    ];

    const campos = [
      "pli_bicipital", "pli_tricipital", "pli_subescapular", "pli_cresta_iliaca",
      "pli_supraespinal", "pli_abdominal", "pli_muslo", "pli_pantorrilla"
    ];

    const dataSeries = [];

    for (let i = 0; i < evaluaciones[campos[0]].length; i++) {
      const puntos = campos.map((campo, j) => ({
        y: evaluaciones[campo][i],
        label: etiquetas[j]
      }));

      dataSeries.push({
        type: "column",
        name: `Evaluación ${i + 1}`,
        showInLegend: true,
        dataPoints: puntos
      });
    }

    return {
      animationEnabled: true,
      title: {
        text: "Pliegues (mm)"
      },
      axisX: {
        labelAngle: -90
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer"
      },
      data: dataSeries
    };
  }

  datosEvalidacion = {};


  //método constructor 
  constructor(private apiEvaluacionService: ApiEvaluacionService,
    private apiUserService: ApiUserService, private route: ActivatedRoute, private router: Router) { }

  //ngOnInit - ejecuta esto en el primer renderizado del componente
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.rut = params.get('id') ?? '';
      this.nro = Number(params.get('nro') ?? 0)
      this.rutev = localStorage.getItem('rutser') ?? '';
      console.log('Info: ' + this.rut + ' ' + this.nro + ' ' + this.rutev);
    });
    this.apiEvaluacionService.getEvaluacionByNroAndRut(this.rut, this.nro).subscribe((evaluacion: ReadEvaluacionArr) => {
      this.evaluacion = evaluacion;
    })
    this.apiEvaluacionService.getEvaluacionesByRutFilter(this.rut).subscribe((eva) => {
      this.datosEvalidacion = eva;
    })
    this.apiUserService.getUserByRut(this.rutev, this.rut).subscribe((user: ReadUser) => {
      this.user = user;
    })
    this.imc();
    this.grasaCorporalPorcentaje();
    this.grasaCorporalKg();
    this.masaMuscularKg();
    this.masaMuscularPorcentaje();

    this.chart_imc = this.generate_imc_chart(this.imcPrueba);
    this.chart_kg = this.generate_chart_kg(this.testChartKG.masa_muscular_kg, this.testChartKG.grasa_kg, this.testChartKG.peso);
    this.chart_perc = this.generate_chart_perc(this.testChartPerc.porcentaje_masa_muscular, this.testChartPerc.porcentaje_grasa_corporal, this.testChartPerc.porcentaje_otros);
    this.chart_perimetro = this.generate_chart_perimetro(this.datosEvalidacion);
    this.chart_pliegue = this.generate_chart_perimetro(this.datosEvalidacion);
  }

  //datos de prueba

  imcPrueba: number = 26;

  testChartKG = {
    peso: 65,
    grasa_kg: 11.7,
    masa_muscular_kg: 24.7
  }

  testChartPerc = {
    porcentaje_masa_muscular: 38,
    porcentaje_grasa_corporal: 18,
    porcentaje_otros: 44
  }

  // datosEvalidacion = {
  //   rut: '19123123-K',
  //   nombre: 'Juan Perez',
  //   peso: [70, 75, 80],
  //   talla: [1.70, 1.75, 1.80],
  //   pli_bicipital: [10, 12, 14],
  //   pli_tricipital: [12, 14, 16],
  //   pli_subescapular: [14, 16, 18],
  //   pli_cresta_iliaca: [16, 18, 20],
  //   pli_supraespinal: [18, 20, 22],
  //   pli_abdominal: [16, 18, 20],
  //   pli_muslo: [18, 20, 22],
  //   pli_pantorrilla: [20, 22, 24],
  //   per_brazo: [30, 32, 34],
  //   per_braz_flex: [32, 34, 36],
  //   per_cintura: [80, 85, 90],
  //   per_cadera: [90, 95, 100],
  //   per_muslo: [50, 55, 60],
  //   per_pantorrilla: [30, 32, 34],
  //   diametro_codo: [6, 6, 6],
  //   diametro_muneca: [5, 6, 6],
  //   diametro_rodilla: [10, 10, 10],
  // }

}
