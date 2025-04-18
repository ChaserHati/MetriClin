import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
Este componente y archivo tiene como fin ejemplificar como llamar y usar en 
otros componentes los servicios definidos en la app, correspondiente a:
1 - CREATE: usuario, ficha,  evaluación
2 - READ: usuario, ficha, evaluación
3 - UPDATE: usuario, ficha, evaluación
4 - DELETE: usuario, ficha, evaluación
*/

//importar servicios e interfaces 
import { ApiUserService, ReadUser, CreateUser, UpdateUser, } from '../services/apiUser/api-user.service';
import { ApiFichaService, CreateFicha, ReadFicha, UpdateFicha } from '../services/apiFicha/api-ficha.service';
import { ApiEvaluacionService, CreateEvaluacion, ReadEvaluacion, UpdateEvaluacion } from '../services/apiEvaluacion/api-evaluacion.service';

@Component({
  selector: 'app-test-service',
  imports: [CommonModule],
  templateUrl: './test-service.component.html',
  styleUrl: './test-service.component.css'
})
export class TestServiceComponent {

  //inicializamos en este componente los servicios que llamaran los métodos que realizaran el CRUD
  constructor(private apiFichaService: ApiFichaService,
    private apiEvaluacionService: ApiEvaluacionService,
    private apiUserService: ApiUserService) { }

  //definimos algunas variables que - por el momento - serviran como argumento de las funciones
  rut: string = '15123123';
  nroEvaluacion: number = 1;





  // 1 - CREATE ---------------------------------------------------------------------------------------

  // 1.1 - Crear Usuario - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //objeto ejemplo con la info que debemos entregarle a la fn crearUsuario
  infoNuevoUser = {
    rut: '15123123',
    dv_rut: 'K',
    nombre: 'Pedro',
    ap_paterno: 'Gonzalez',
    ap_materno: 'Perez',
    fecha_nac: '05-05-1995',
    contrasena: 'string123',
    correo: 'pedro@gmail.com',
    num_celular: 987687687,
    cod_rol: 3,
    cod_comuna: 1
  }

  //argumentos requeridos: objeto con la info del usuario
  crearUsuario() {
    this.apiUserService.createUser(this.infoNuevoUser).subscribe({
      next: respuesta => {
        console.log('Usuario creado:', respuesta);
      },
      error: error => {
        console.error('Error al crear usuario:', error);
      }
    })
  }


  //1.2 - Crear ficha clinica - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //objeto con la info de la ficha clinica
  infoNuevaFicha = {
    rut: '15123123',
    descripcion: 'descripcio ficha',
    diagnostico: 'sobrepeso',
    objetivo: 'bajar de peso',
    tratamiento: 'reg hipocalorico',
    fecha_ingreso: '01-01-2025',
    fecha_prox_sesion: '01-02-2025'
  }

  //argumentos requeridos: objeto con la info de la ficha
  crearFicha() {
    this.apiFichaService.createFicha(this.infoNuevaFicha).subscribe({
      next: respuesta => {
        console.log('Ficha creada:', respuesta);
      },
      error: error => {
        console.error('Error al crear ficha:', error);
      }
    })
  }

  //1.3 - Crear evaluación - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //objeto ejemplo con la info que debemos entregarle a la fn actualizarEvaluacion
  infoNuevaEvaluacion: UpdateEvaluacion = {
    fecha_evaluacion: '05-04-2025',
    descripcion: 'descripcion',
    peso: 70,
    talla: 175,
    pli_bicipital: 8,
    pli_tricipital: 15,
    pli_subescapular: 15,
    pli_cresta_iliaca: 20,
    pli_espina_iliaca: 10,
    pli_abdominal: 15,
    pli_muslo: 10,
    pli_pantorrilla: 5,
    per_brazo: 35,
    per_brazo_flex: 36,
    per_cintura: 80,
    per_cadera: 90,
    per_muslo: 60,
    per_pantorrilla: 40,
    diametro_humero: 7,
    diametro_muneca: 6,
    diametro_femur: 10,
    cod_imc: 3,
    cod_grasa_corporal: 3,
    cod_masa_muscular: 3
  }

  //argumentos requeridos: rut y objeto con info de la evaluación
  crearEvaluacion() {
    this.apiEvaluacionService.createEvaluacion(this.rut, this.infoNuevaEvaluacion).subscribe({
      next: respuesta => {
        console.log('Evaluación creada:', respuesta);
      },
      error: error => {
        console.error('Error al crear evaluación:', error);
      }
    })
  }




  // 2 - READ --------------------------------------------------------------------------------------

  //definimos las variables donde se almacenara la información llamada
  users: ReadUser[] = [];
  user: ReadUser = {
    rut: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    fecha_nac: new Date(),
    correo: '',
    num_celular: 0
  }
  ficha: ReadFicha = {
    descripcion: '',
    diagnostico: '',
    objetivo: '',
    tratamiento: '',
    fecha_ingreso: '',
    fecha_prox_sesion: ''
  };
  evaluacion: ReadEvaluacion = {
    nro_evaluacion: 0,
    fecha_evaluacion: '',
    descripcion: '',
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
    cod_imc: 0,
    cod_grasa_corporal: 0,
    cod_masa_muscular: 0
  }
  evaluaciones: ReadEvaluacion[] = [];

  //ejecutamos los métodos para obtener usuario, ficha y evaluación inmediatamente cuando se inicializa el componente
  ngOnInit() {
    //obtener un usuario - argumento: rut
    this.apiUserService.getUserByRut(this.rut).subscribe((user: ReadUser) => {
      this.user = user;
    });
    //obtener todos los usuarios - no necesita argumento
    this.apiUserService.getUsers().subscribe(user => {
      this.users = user;
    });
    //obtener ficha clinica - argumento: rut
    this.apiFichaService.getFichaByRut(this.rut).subscribe((ficha: ReadFicha) => {
      this.ficha = ficha;
    });
    //obtener una evaluacion - argumento: rut y nro de evalacion
    this.apiEvaluacionService.getEvaluacionByNroAndRut(this.rut, this.nroEvaluacion).subscribe((evaluacion: ReadEvaluacion) => {
      this.evaluacion = evaluacion;
    })
    //obtener todas las evaluaciones de un usuario - argumento: rut
    this.apiEvaluacionService.getEvaluacionesByRut(this.rut).subscribe((evaluaciones: ReadEvaluacion[]) => {
      this.evaluaciones = evaluaciones;
    });
  }





  // 3 - UPDATE -------------------------------------------------------------------------------------------------

  //3.1 - actualizar usuario - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //objeto ejemplo con la info que debemos entregarle a la fn actualizarUsuario
  infoActualizadaUser = {
    nombre: 'Kevin',
    ap_paterno: 'Gonzalez',
    ap_materno: 'Perez',
    fecha_nac: '05-05-1995',
    contrasena: 'string123',
    correo: 'kevin@gmail.com',
    num_celular: 987687687
  }

  //argumentos requeridos: rut y objeto con nueva info
  actualizarUsuario() {
    this.apiUserService.updateUser(this.rut, this.infoActualizadaUser).subscribe({
      next: respuesta => {
        console.log('Usuario actualizado:', respuesta);
      },
      error: error => {
        console.error('Error al actualizar usuario:', error);
      }
    })
  }


  //3.2 - actualizar ficha - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //objeto ejemplo con la info que debemos entregarle a la fn actualizarFicha
  infoActualizadaFicha = {
    descripcion: 'nueva descripcio ficha',
    diagnostico: 'normopeso',
    objetivo: 'bajar e peso',
    tratamiento: 'reg hipocalorico',
    fecha_ingreso: '01-01-2025',
    fecha_prox_sesion: '01-02-2025'
  }

  //argumentos requeridos: rut y objeto con nueva info
  actualizarFicha() {
    this.apiFichaService.updateFicha(this.rut, this.infoActualizadaFicha).subscribe({
      next: respuesta => {
        console.log('Ficha actualizada:', respuesta);
      },
      error: error => {
        console.error('Error al actualizar ficha:', error);
      }
    })
  }

  //3.3 - actualizar evaluación - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //objeto ejemplo con la info que debemos entregarle a la fn actualizarEvaluacion
  infoActualizadaEvaluacion: UpdateEvaluacion = {
    fecha_evaluacion: '05-05-2025',
    descripcion: 'descripcion',
    peso: 80,
    talla: 175,
    pli_bicipital: 8,
    pli_tricipital: 15,
    pli_subescapular: 15,
    pli_cresta_iliaca: 20,
    pli_espina_iliaca: 10,
    pli_abdominal: 15,
    pli_muslo: 10,
    pli_pantorrilla: 5,
    per_brazo: 35,
    per_brazo_flex: 36,
    per_cintura: 80,
    per_cadera: 90,
    per_muslo: 60,
    per_pantorrilla: 40,
    diametro_humero: 7,
    diametro_muneca: 6,
    diametro_femur: 10,
    cod_imc: 3,
    cod_grasa_corporal: 3,
    cod_masa_muscular: 3
  }

  //arguemntos requeridos: rut y nro de ev
  actualizarEvaluacion() {
    this.apiEvaluacionService.updateEvaluacion(this.rut, this.nroEvaluacion, this.infoActualizadaEvaluacion).subscribe({
      next: respuesta => {
        console.log('Evaluacion actualizada:', respuesta);
      },
      error: error => {
        console.error('Error al actualizar evaluacion:', error);
      }
    })
  }




  // 4 - DELETE ------------------------------------------------------------------------------------------------

  //4.1 - eliminar usuario - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //argumentos requeridos: rut
  eliminarUsuario() {
    this.apiUserService.deleteUser(this.rut).subscribe({
      next: respuesta => {
        console.log('Usuario eliminado:', respuesta);
      },
      error: error => {
        console.error('Error al eliminar usuario:', error);
      }
    })
  }

  //4.2 - eliminar ficha - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //argumentos requeridos: rut
  eliminarFicha() {
    this.apiFichaService.deleteFicha(this.rut).subscribe({
      next: respuesta => {
        console.log('Ficha eliminada:', respuesta);
      },
      error: error => {
        console.error('Error al eliminar ficha:', error);
      }
    })
  }

  //4.3 - eliminar evaluación - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //argumentos requeridos: rut y nro de evaluacion
  eliminarEvaluacion() {
    this.apiEvaluacionService.deleteEvaluacion(this.rut, this.nroEvaluacion).subscribe({
      next: respuesta => {
        console.log('Evaluación eliminada:', respuesta);
      },
      error: error => {
        console.error('Error al eliminar evaluación:', error);
      }
    })
  }


}