import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SalasService } from './salas.service';
import { Funcion } from '../modelo/funcion.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  constructor(
    private db: AngularFirestore,
    private salaService: SalasService
  ) {}
  getFunciones(numero: number, multiplex: string): Observable<Funcion[]> {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion');
    let funciones = doc.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Funcion;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return funciones;
  }

  agregarFuncion(funcion: Funcion, numero: number, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion')
      .doc(funcion.id)
      .set(funcion);
  }
}
