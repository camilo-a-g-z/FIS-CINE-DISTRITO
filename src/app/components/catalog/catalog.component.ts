import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  peliculas: Pelicula[];
  pelicula: Pelicula;
  constructor(
    private peliculaService: PeliculaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.peliculaService
      .getPeliculasPorEstado('Activa')
      .subscribe((peliculas) => {
        this.peliculas = peliculas;
      });
  }

  verFunciones(pelicula: Pelicula) {
    this.router.navigate(['/funciones', pelicula.nombre]);
  }
}
