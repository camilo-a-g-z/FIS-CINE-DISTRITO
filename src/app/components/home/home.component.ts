import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  peliculas: Pelicula[];
  pelicula: Pelicula = {
    id: '',
    nombre: '',
    clasificacionEdad: '',
    duracion: '',
    director: '',
    sinopsis: '',
    urlPelicula: '',
    estado: '',
    genero: [],
  };
  cantPeliculas: number;

  constructor(private peliculaServicio: PeliculaService) {}
  ngOnInit(): void {
    this.peliculaServicio.getPeliculas().subscribe((peliculas) => {
      this.peliculas = peliculas;
    });
  }
}
