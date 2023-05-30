import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  peliculas: Pelicula[];
  pelicula: Pelicula;
  constructor(private peliculaService: PeliculaService) {}
  ngOnInit(): void {
    this.peliculaService
      .getPeliculasPorEstado('Activa')
      .subscribe((peliculas) => {
        this.peliculas = peliculas;
      });
  }
}
