import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private db: AngularFirestore) { }

  getSalasMultiplex(multiplex:string): Observable<Sala[]> {
    // Obtenemos las peliculas
    let colec = this.db.collection("multiplex").doc(multiplex).collection("sala")
    let salas = colec.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Sala;
          return datos;
        });
      })
    );
    return salas
  }

  agregarSala(sala:Sala,multiplex:string) {
    let colec = this.db.collection("multiplex").doc(multiplex).collection("sala")
    colec.add(sala);
  }

  getSala(numero:number,multiplex:string) {
    let doc = this.db.doc(`multiplex/${multiplex}`).collection("sala").doc(numero.toString());
    let sala = doc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Sala;
          return datos;
        }
      })
    );
    return sala;
  }

  modificarSala(sala:Sala,multiplex:string) {
    let doc = this.db.doc(`multiplex/${multiplex}`).collection("sala").doc(sala.numero.toString());
    doc.update(sala);
  }

  eliminarSala(sala:Sala,multiplex:string) {
    let doc = this.db.doc(`multiplex/${multiplex}`).collection("sala").doc(sala.numero.toString());
    doc.delete();
  }


}
