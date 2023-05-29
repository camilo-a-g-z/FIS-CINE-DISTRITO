import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pelicula } from 'src/app/modelo/pelicula.model';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-editar-agregar-pelicula',
  templateUrl: './editar-agregar-pelicula.component.html',
  styleUrls: ['./editar-agregar-pelicula.component.css'],
})
export class EditarAgregarPeliculaComponent implements OnInit {
  generosSeleccionados: string[] = [];
  generosDisponibles: string[] = [
    'Aventura',
    'Fantasia',
    'Musical',
    'Romance',
    'Accion',
    'Thriller',
    'Ciencia Ficcion',
    'Comedia',
    'Animacion',
    'Documental',
    'Drama',
    'Terror',
    'Superheroes',
    'Suspenso',
    'Historia',
    'Familiar',
  ];
  generos: { nombre: string; seleccionado: boolean }[] = [];
  id: string;
  isEdit: boolean;
  pelicula: null | Pelicula = {
    nombre: '',
    clasificacionEdad: '',
    duracion: '',
    director: '',
    sinopsis: '',
    urlPelicula: '', //url de la imagen de la pelicula
    estado: '',
    genero: [],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id == '0') {
      //estamos agregando una nueva pelicula
      this.isEdit = false;
      this.generos = this.generosDisponibles.map((genero) => {
        return {
          nombre: genero,
          seleccionado: false,
        };
      });
    } else {
      //estamos editando una pelicula
      this.isEdit = true;
      this.generos = this.generosDisponibles.map((genero) => {
        return {
          nombre: genero,
          seleccionado: this.generosSeleccionados.includes(genero),
        };
      });
    }
  }
  guardar({ value, valid }: { value: Pelicula; valid: boolean | null }) {
    if (valid) {
      value.genero = this.obtenerGeneros();
      if (this.isEdit) {
        //modificar
        this.peliculaService.modificarPelicula(value);
      } else {
        //agregar
        this.peliculaService.agregarPelicula(value);
      }
      this.router.navigate(['/admin/peliculas']);
    } else {
      console.log('Formulario no valido');
    }
  }
  toggleSeleccion(genero: { nombre: string; seleccionado: boolean }): void {
    genero.seleccionado = true;
    console.log(genero);
  }

  obtenerGeneros() {
    return this.generos
      .filter((genero) => genero.seleccionado)
      .map((genero) => genero.nombre);
  }
}
