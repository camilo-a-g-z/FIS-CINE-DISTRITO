import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-peliculas-admin',
  templateUrl: './peliculas-admin.component.html',
  styleUrls: ['./peliculas-admin.component.css'],
})
export class PeliculasAdminComponent implements OnInit {
  peliculas: Pelicula[];
  constructor(
    private peliculaService: PeliculaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe((peliculas) => {
      this.peliculas = peliculas;
    });
  }
  agregarPelicula() {
    this.router.navigate(['admin/editar-agregar-pelicula', '0']);
  }
  editarPelicula(pelicula: Pelicula) {
    this.router.navigate(['admin/editar-agregar-pelicula', pelicula.nombre]);
  }
  eliminarPelicula(pelicula: Pelicula) {
    if (confirm('¿Está seguro de eliminar la película?')) {
      this.peliculaService.eliminarPelicula(pelicula);
      this.router.navigate(['/admin/peliculas']);
    }
  }
}
