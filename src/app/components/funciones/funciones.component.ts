import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcion } from 'src/app/modelo/funcion.model';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { Sala } from 'src/app/modelo/sala.model';
import { FuncionService } from 'src/app/servicios/funcion.service';
import { MultiplexService } from 'src/app/servicios/multiplex.service';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css'],
})
export class FuncionesComponent implements OnInit {
  pelicula: Pelicula = {
    nombre: '',
    sinopsis: '',
    duracion: '',
    clasificacionEdad: '',
    genero: [],
    urlPelicula: '',
    director: '',
    estado: '',
  };
  id: string;
  multiplexes: Multiplex[];
  multiplex: string;
  funciones: Funcion[];
  funcion: Funcion = {
    empleadoID: '',
    estado: '',
    id: '',
    peliculaID: '',
    sillas: [],
  };
  sillas: string[] = [];
  sillasMostrar: { silla: string; ocupada: boolean }[] = [];
  sala: Sala = {
    numero: 0,
    sillas: [],
  };
  sillasSeleccionadas: string[] = [];
  cantidadSillas: number = 0;
  cantidadSillasSeleccionadas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private multiplexService: MultiplexService,
    private funcionService: FuncionService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['pelicula'];
      this.peliculaService.getPelicula(this.id).subscribe((pelicula) => {
        if (pelicula) {
          this.pelicula = pelicula;
        }
      });
    });
    this.multiplexService.getMultiplexes().subscribe((multiplexes) => {
      if (multiplexes) {
        this.multiplexes = multiplexes;
      }
    });
  }

  //buscar funciones
  buscarFunciones() {
    this.funciones = this.funcionService.getFuncionesPeliculaActivas(
      this.multiplex,
      this.id
    );
    console.log(this.funciones);
  }
  //recibe un formato HH-MM_DD-MM-YYYY y lo convierte a un string con formato local
  convertirFecha(fecha: string | undefined) {
    if (fecha) {
      let fechaArray = fecha.split('_');
      let hora = fechaArray[0].split('-');
      let dia = fechaArray[1].split('-');
      let fechaString =
        dia[0] + '/' + dia[1] + '/' + dia[2] + ' ' + hora[0] + ':' + hora[1];
      return fechaString;
    } else {
      return '';
    }
  }
  //recive una funcion y busca la sala en el multiplex
  buscarSala(funcion: Funcion) {
    this.funcionService.getSalaFuncion(funcion, this.multiplex);
    this.funcion = funcion;
  }

  mostrarSillas() {
    this.sala = this.funcionService.sala;
    console.log(this.sala);
    if (this.sala == null) {
      this.sala = {
        numero: 0,
        sillas: [],
      };
    }
    let idFuncion: string = '';
    if (this.funcion.id != null) {
      idFuncion = this.funcion.id;
    }
    //obtenemos la funcion observable
    this.funcionService
      .getFuncionObservable(idFuncion, this.sala.numero, this.multiplex)
      .subscribe((funcion) => {
        if (funcion) {
          this.sillas = [];
          this.sillasMostrar = [];
          if (this.sala) {
            this.sillas = this.sala.sillas;
            for (let i = 0; i < this.sillas.length; i++) {
              if (funcion.sillas[i] == 'libre') {
                this.sillasMostrar.push({
                  silla: this.sillas[i],
                  ocupada: false,
                });
              } else {
                this.sillasMostrar.push({
                  silla: this.sillas[i],
                  ocupada: true,
                });
              }
            }
            /*funcion.sillas.forEach((silla) => {
              this.sillasMostrar.push({
                silla: silla,
                ocupada: false,
              });
            });
            this.sillas.forEach((silla) => {
              if (!this.sillasMostrar.find((s) => s.silla == silla)) {
                this.sillasMostrar.push({
                  silla: silla,
                  ocupada: false,
                });
              }
            });*/
          }
        }
      });
  }

  toggleSeleccion(silla: { silla: string; ocupada: boolean }): void {
    this.cantidadSillasSeleccionadas++;
    if (this.cantidadSillasSeleccionadas > this.cantidadSillas) {
      alert('No puede seleccionar mas sillas de las disponibles');
      this.sillasSeleccionadas.pop();
      this.cantidadSillasSeleccionadas--;
    } else {
      this.sillasSeleccionadas.push(silla.silla);
      silla.ocupada = true;
    }
  }
}
