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
          datos.nombre = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.peliculas;
  }
  //se obtienen peliculas por estado, Activa, Inactiva, Proximamente
  getPeliculasPorEstado(estado: string): Observable<Pelicula[]> {
    // Obtenemos las peliculas por estado
    let peliculasAux: Observable<(Pelicula | undefined)[]>;
    peliculasAux = this.peliculasColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Pelicula;
          datos.nombre = accion.payload.doc.id;
          if (accion.payload.doc.data().estado == estado) {
            return datos;
          } else {
            return undefined;
          }
        });
      })
    );
    if (typeof peliculasAux == 'undefined') {
    } else {
      //bug de typescript
      this.peliculas = peliculasAux as Observable<Pelicula[]>;
    }
    //quitamos todos los undefined
    this.peliculas = this.peliculas.pipe(
      map((peliculas) => {
        return peliculas.filter((pelicula) => {
          return pelicula != undefined;
        });
      })
    );
    return this.peliculas;
  }

  agregarPelicula(pelicula: Pelicula) {
    //se agrega pelicula especificando el id
    this.peliculasColeccion.doc(pelicula.nombre).set(pelicula);
  }

  getPelicula(id: string) {
    this.peliculasDoc = this.db.doc<Pelicula>(`peliculas/${id}`);
    this.pelicula = this.peliculasDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Pelicula;
          datos.nombre = accion.payload.id;
          return datos;
        }
      })
    );
    return this.pelicula;
  }

  modificarPelicula(pelicula: Pelicula) {
    this.peliculasDoc = this.db.doc(`peliculas/${pelicula.nombre}`);
    this.peliculasDoc.update(pelicula);
  }

  eliminarPelicula(pelicula: Pelicula) {
    this.peliculasDoc = this.db.doc(`peliculas/${pelicula.nombre}`);
    this.peliculasDoc.delete();
  }
}
