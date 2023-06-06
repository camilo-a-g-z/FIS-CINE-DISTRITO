export interface Pelicula {
  nombre: string;
  clasificacionEdad: string;
  duracion: string;
  director: string;
  sinopsis: string;
  urlPelicula: string; //url de la imagen de la pelicula
  estado: string;
  genero: Array<string>;
}
