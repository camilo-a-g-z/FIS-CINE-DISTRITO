import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sala } from '../modelo/sala.model';
import { Observable, map } from 'rxjs';
import { MultiplexService } from './multiplex.service';

@Injectable({
  providedIn: 'root',
})
export class SalasService {
  constructor(
    private db: AngularFirestore,
    private mService: MultiplexService
  ) {}

  getSalasMultiplex(multiplex: string): Observable<Sala[]> {
    // Obtenemos las peliculas
    if (this.mService.existeMultiplex(multiplex)) {
      let colec = this.db
        .collection('multiplex')
        .doc(multiplex)
        .collection('sala');
      let salas = colec.snapshotChanges().pipe(
        map((cambios) => {
          return cambios.map((accion) => {
            const datos = accion.payload.doc.data() as Sala;
            datos.id = accion.payload.doc.id;
            return datos;
          });
        })
      );
      return salas;
    } else {
      //devolvemos un observable vacio
      return new Observable<Sala[]>();
    }
  }

  agregarSala(sala: Sala, multiplex: string) {
    if (this.mService.existeMultiplex(multiplex)) {
      let colec = this.db
        .collection('multiplex')
        .doc(multiplex)
        .collection('sala');
      colec.add(sala);
    }
  }

  getSala(id: string, multiplex: string) {
    let doc = this.db.doc(`multiplex/${multiplex}`).collection('sala').doc(id);
    let sala = doc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Sala;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return sala;
  }

  modificarSala(sala: Sala, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(sala.id);
    doc.update(sala);
  }

  eliminarSala(sala: Sala, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(sala.id);
    doc.delete();
  }
}
