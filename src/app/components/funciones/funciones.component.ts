import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcion } from 'src/app/modelo/funcion.model';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { Pelicula } from 'src/app/modelo/pelicula.model';
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
    console.log(this.multiplex);
    let funciones: Funcion[] = this.funcionService.getFuncionesPelicula(
      this.multiplex,
      this.id
    );
    console.log(funciones);
  }
}
