import { Injectable } from '@angular/core';
import { Multiplex } from '../modelo/multiplex.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultiplexService {
  multiplexesColeccion: AngularFirestoreCollection<Multiplex>;
  multiplexesDoc: AngularFirestoreDocument<Multiplex>;
  multiplexes: Observable<Multiplex[]>;
  multiplex: Observable<Multiplex | null>;

  constructor(private db: AngularFirestore) {
    this.multiplexesColeccion = db.collection('multiplex', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  getMultiplexes(): Observable<Multiplex[]> {
    // Obtener los multiplexes
    this.multiplexes = this.multiplexesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Multiplex;
          datos.nombre = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.multiplexes;
  }

  agregarMultiplex(multiplex: Multiplex) {
    //se agrega multiplex especificando el id
    this.multiplexesColeccion.doc(multiplex.nombre).set(multiplex);
  }

  getMultiplex(id: string) {
    this.multiplexesDoc = this.db.doc<Multiplex>(`multiplex/${id}`);
    this.multiplex = this.multiplexesDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Multiplex;
          datos.nombre = accion.payload.id;
          return datos;
        }
      })
    );
    return this.multiplex;
  }

  modificarMultiplex(multiplex: Multiplex) {
    this.multiplexesDoc = this.db.doc(`multiplex/${multiplex.nombre}`);
    this.multiplexesDoc.update(multiplex);
  }

  eliminarMultiplex(multiplex: Multiplex) {
    this.multiplexesDoc = this.db.doc(`multiplex/${multiplex.nombre}`);
    this.multiplexesDoc.delete();
  }
}
