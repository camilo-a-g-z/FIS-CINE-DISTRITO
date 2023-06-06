import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelo/empleado.model';
import { Funcion } from 'src/app/modelo/funcion.model';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { Sala } from 'src/app/modelo/sala.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { FuncionService } from 'src/app/servicios/funcion.service';
import { MultiplexService } from 'src/app/servicios/multiplex.service';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { SalasService } from 'src/app/servicios/salas.service';

@Component({
  selector: 'app-editar-agregar-funcion',
  templateUrl: './editar-agregar-funcion.component.html',
  styleUrls: ['./editar-agregar-funcion.component.css'],
})
export class EditarAgregarFuncionComponent implements OnInit {
  id: string;
  multiplexParameter: string;
  empleadoMail: string;
  salaParameter: string;
  isEdit: boolean;
  multiplexes: Multiplex[];
  sala: Sala;
  funcion: Funcion = {
    id: '',
    empleadoID: '',
    estado: '',
    peliculaID: '',
    sillas: [],
  };
  peliculas: Pelicula[];
  empleados: Empleado[];
  dia: string;
  mes: string;
  anio: string;
  hora: string;
  minuto: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private multiplexService: MultiplexService,
    private funcionService: FuncionService,
    private salaService: SalasService,
    private empleadoService: EmpleadoService
  ) {}
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });
    this.peliculaService
      .getPeliculasPorEstado('Activa')
      .subscribe((peliculas) => {
        this.peliculas = peliculas;
      });
    this.id = this.route.snapshot.params['id'];
    this.multiplexParameter = this.route.snapshot.params['multiplex'];
    this.salaParameter = this.route.snapshot.params['sala'];
    this.salaService
      .getSala(parseInt(this.salaParameter), this.multiplexParameter)
      .subscribe((sala) => {
        if (sala != null) {
          this.sala = sala;
        }
      });
    if (this.id == '0') {
      //estamos agregando un nuevo empleado
      this.isEdit = false;
    } else {
      //estamos editando un empleado
      this.cargarDatos(this.id);
      this.funcionService
        .getFuncion(
          this.id,
          parseInt(this.salaParameter),
          this.multiplexParameter
        )
        .subscribe((funcion) => {
          if (funcion != null) {
            this.funcion = funcion;
            this.empleadoService
              .getEmpleado(funcion.empleadoID)
              .subscribe((empleado) => {
                if (empleado != null) {
                  this.funcion.empleadoID = empleado.nombre;
                  this.empleadoMail = empleado.correo || '';
                }
              });
          }
        });
      this.isEdit = true;
    }
  }

  //funcion para cargar datos de anio, mes, dia, hora y minuto recibiendo un string con el formato HH-MM_DD-MM-AAAA
  cargarDatos(fecha: string) {
    let datos = fecha.split('_');
    let horaMinuto = datos[0].split('-');
    let diaMesAnio = datos[1].split('-');
    this.hora = horaMinuto[0];
    this.minuto = horaMinuto[1];
    this.dia = diaMesAnio[0];
    this.mes = diaMesAnio[1];
    this.anio = diaMesAnio[2];
  }

  guardar({ value, valid }: { value: any; valid: boolean | null }) {
    this.funcion.empleadoID = value.empleado;
    this.funcion.estado = value.estado;
    this.funcion.peliculaID = value.pelicula;
    this.funcion.id =
      this.hora.toString() +
      '-' +
      this.minuto.toString() +
      '_' +
      this.dia.toString() +
      '-' +
      this.mes.toString() +
      '-' +
      this.anio.toString();

    this.funcion.sillas = this.generarSillas(this.sala);

    console.log(this.funcion);
    console.log(valid);
    if (valid) {
      if (this.isEdit) {
        console.log('funcion modificada');
        //modificar
        this.funcionService.actualizarFuncion(
          this.funcion,
          parseInt(this.salaParameter),
          this.multiplexParameter
        );
      } else {
        //agregar
        this.funcionService.agregarFuncion(
          this.funcion,
          parseInt(this.salaParameter),
          this.multiplexParameter
        );
        console.log('funcion agregada');
      }
      this.router.navigate(['/admin/multiplex']);
    } else {
      console.log('Formulario no valido');
    }
  }
  //metodo para generar las sillas de la funcion reciviendo como parametro una sala y devolviendo un map
  generarSillas(sala: Sala): string[] {
    let sillas: string[] = [];
    for (let i = 0; i < sala.sillas.length; i++) {
      sillas.push('libre');
    }
    return sillas;
  }
}
