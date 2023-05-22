import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Pelicula } from '../modelo/pelicula.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class PeliculaService {
  peliculasColeccion: AngularFirestoreCollection<Pelicula>;
  peliculasDoc: AngularFirestoreDocument<Pelicula>;
  peliculas: Observable<Pelicula[]>;
  pelicula: Observable<Pelicula | null>;

  constructor(private db: AngularFirestore) {
    this.peliculasColeccion = db.collection('peliculas', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  getPeliculas(): Observable<Pelicula[]> {
    // Obtenemos las peliculas
    this.peliculas = this.peliculasColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Pelicula;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.peliculas;
  }

  agregarPelicula(pelicula: Pelicula) {
    this.peliculasColeccion.add(pelicula);
  }

  getPelicula(id: string) {
    this.peliculasDoc = this.db.doc<Pelicula>(`peliculas/${id}`);
    this.pelicula = this.peliculasDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Pelicula;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.pelicula;
  }

  modificarPelicula(pelicula: Pelicula) {
    this.peliculasDoc = this.db.doc(`peliculas/${pelicula.id}`);
    this.peliculasDoc.update(pelicula);
  }

  eliminarPelicula(pelicula: Pelicula) {
    this.peliculasDoc = this.db.doc(`peliculas/${pelicula.id}`);
    this.peliculasDoc.delete();
  }
}
