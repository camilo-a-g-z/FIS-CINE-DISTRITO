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
  salaParameter: string;
  isEdit: boolean;
  multiplexes: Multiplex[];
  sala: Sala;
  funcion: Funcion = {
    id: '',
    empleadoID: '',
    estado: '',
    peliculaID: '',
    sillas: new Map<string, string>(),
  };
  peliculas: Pelicula[];
  empleados: Empleado[];
  dia: string;
  mes: string;
  anio: string;
  hora: string;
  minuto: string;
  auxSala: Sala = {
    numero: 0,
    sillas: [],
  };

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
    this.salaService
      .getSala(parseInt(this.salaParameter), this.multiplexParameter)
      .subscribe((sala) => {
        if (sala != null) {
          this.auxSala = sala;
        }
      });
    this.peliculaService
      .getPeliculasPorEstado('Activa')
      .subscribe((peliculas) => {
        this.peliculas = peliculas;
      });
    this.id = this.route.snapshot.params['id'];
    this.multiplexParameter = this.route.snapshot.params['multiplex'];
    this.salaParameter = this.route.snapshot.params['sala'];
    if (this.id == '0') {
      //estamos agregando un nuevo empleado
      this.isEdit = false;
    } else {
      //estamos editando un empleado
      this.isEdit = true;
    }
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

    this.funcion.sillas = this.generarSillas(this.auxSala);

    console.log(this.funcion);
    if (valid) {
      if (this.isEdit) {
        //modificar
        //this.funcionService.modificarFuncion(value);
      } else {
        //agregar
        //this.funcionService.agregarFuncion(value);
      }
      //this.router.navigate(['/admin/funciones']);
    } else {
      console.log('Formulario no valido');
    }
  }
  //metodo para generar las sillas de la funcion reciviendo como parametro una sala y devolviendo un map
  generarSillas(sala: Sala): Map<string, string> {
    let sillas = new Map<string, string>();
    for (let i = 0; i < sala.sillas.length; i++) {
      sillas.set(sala.sillas[i], 'libre');
    }
    return sillas;
  }
}
