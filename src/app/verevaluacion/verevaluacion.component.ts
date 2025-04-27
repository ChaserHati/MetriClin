import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RedirectCommand } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiEvaluacionService, ReadEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';
import { ApiUserService, ReadUser } from '../services/apiUser/api-user.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-verevaluacion',
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatSidenavModule, MatIconModule, MatButtonModule, CanvasJSAngularChartsModule],
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

  //codigo de graficos

  chart_imc:any;
  chart_kg:any;
  chart_perc:any;
  chart_perimetro:any;
  chart_pliegue:any;

  generate_imc_chart(imc:number){
    return{
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
          { x: 0, y:[0, 18.4], label: "Bajo Peso",color: "#00BFFF"},
          { x: 0, y:[18.5, 24.9], label: "Normal", color: "#32CD32"},
          { x: 0, y:[25, 29.9], label: "Sobrepeso", color: "#FFD700"},
          { x: 0, y:[30, 34.9], label: "Obeso I", color: "#FF8C00"},
          { x: 0, y:[35, 40], label: "Obeso II", color: "#FF4500"},
        ]
    },
    {
      type: "rangeBar",
      dataPoints: [
        { x: 0, y:[ imc-0.5, imc+0.5  ], label: "IMC",indexLabel: "⯅",color: "#000000",toolTipContent: `IMC: ${imc.toFixed(1)}`},
      ]}]}
  }

  generate_chart_kg(masa_muscular_kg:number,grasa_corporal_kg:number,peso_kg:number){
    return{
      title:{
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

  generate_chart_perc(mm:number,gc:number,oc:number){
    return{
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

  generate_chart_perimetro(eval1:ReadEvaluacion, eval2:ReadEvaluacion){
    return{
      animationEnabled: true,
      title:{
      text: "Perimetros (cm)"    
      },
      axisY: {
        includeZero: true,
      },
      legend: {
        cursor: "pointer",
      },
      data: [{        
        type: "bar",
        name: "Evaluacion Previa",  
        showInLegend: true, 
        dataPoints: [      
        { y: eval1.per_brazo, label: "Brazo Relajado" },
        { y: eval1.per_brazo_flex, label: "Brazo Flexionado" },
        { y: eval1.per_cintura, label: "Cintura" },
        { y: eval1.per_cadera, label: "Cadera" },
        { y: eval1.per_muslo, label: "Muslo" },
        { y: eval1.per_pantorrilla, label: "Pantorrilla" }
        ]
      },
        {        
        type: "bar",
        name: "Evaluacion Actual",
        showInLegend: true,
        dataPoints: [      
          { y: eval2.per_brazo, label: "Brazo Relajado" },
          { y: eval2.per_brazo_flex, label: "Brazo Flexionado" },
          { y: eval2.per_cintura, label: "Cintura" },
          { y: eval2.per_cadera, label: "Cadera" },
          { y: eval2.per_muslo, label: "Muslo" },
          { y: eval2.per_pantorrilla, label: "Pantorrilla" }
        ]
      }]
    }
  }

  generate_chart_pliegue(eval1:ReadEvaluacion, eval2:ReadEvaluacion){
    return{
      animationEnabled: true,
	  title: {
		text: "Pliegues (mm)"
	  },
	  axisX: {
		labelAngle: -90
	  },
	  axisY: {
	  },
	  toolTip: {
		shared: true
	  },
	  legend:{
		cursor:"pointer",
	  },
	  data: [{
	    type: "column",	
	    name: "Evaluacion Previa",
	    showInLegend: true, 
	    dataPoints:[
	  	  {label: "Bicipital", y: eval1.pli_bicipital},
	  	  {label: "Tricipital", y: eval1.pli_tricipital},
	  	  {label: "Subescapular", y: eval1.pli_subescapular},
	  	  {label: "Cresta Illiaca", y: eval1.pli_cresta_iliaca},
	  	  {label: "Espina Iliaca", y: eval1.pli_espina_iliaca},
	  	  {label: "Abdomen", y: eval1.pli_abdominal},
	  	  {label: "Muslo", y: eval1.pli_muslo},
	  	  {label: "Pantorrilla", y: eval1.pli_pantorrilla},
	  ]
	  }, {
	    type: "column",	
	    name: "Evaluacion Actual",
	    showInLegend: true,
	    dataPoints:[
	  	  {label: "Bicipital", y: eval2.pli_bicipital},
	  	  {label: "Tricipital", y: eval2.pli_tricipital},
	  	  {label: "Subescapular", y: eval2.pli_subescapular},
	  	  {label: "Cresta Illiaca", y: eval2.pli_cresta_iliaca},
	  	  {label: "Espina Iliaca", y: eval2.pli_espina_iliaca},
	  	  {label: "Abdomen", y: eval2.pli_abdominal},
	  	  {label: "Muslo", y: eval2.pli_muslo},
	  	  {label: "Pantorrilla", y: eval2.pli_pantorrilla},
	    ]
    }]
    }
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

    this.chart_imc = this.generate_imc_chart(this.imc());
    this.chart_kg = this.generate_chart_kg(this.masaMuscularKg(),this.grasaCorporalKg(),this.evaluacion.peso);
    this.chart_perc = this.generate_chart_perc(this.masaMuscularPorcentaje(),this.grasaCorporalPorcentaje(),100-this.masaMuscularPorcentaje()-this.grasaCorporalPorcentaje());
    // this.chart_perimetro = this.generate_chart_perimetro(insertar evaluacion previa, this.evaluacion);
    // this.chart_pliegue = this.generate_chart_perimetro(insertar evaluacion previa, this.evaluacion);
  }

}
