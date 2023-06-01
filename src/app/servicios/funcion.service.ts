import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SalasService } from './salas.service';
import { Funcion } from '../modelo/funcion.model';
import { Observable, map } from 'rxjs';
import { Sala } from '../modelo/sala.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  sala: Sala = {
    numero: 0,
    sillas: [],
  };
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

  getFuncion(id: string, numero: number, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion')
      .doc(id);
    let funcion = doc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Funcion;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return funcion;
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
  //se actualiza la funcion especificando el id
  actualizarFuncion(funcion: Funcion, numero: number, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion')
      .doc(funcion.id)
      .update(funcion);
  }
  //se elimina la funcion especificando el id
  eliminarFuncion(funcion: Funcion, numero: number, multiplex: string) {
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion')
      .doc(funcion.id)
      .delete();
  }
  //se recive un multiplex y una pelicula y se retorna un arreglo de funciones buscando en todas las salas del multiplex
  getFuncionesPelicula(multiplex: string, pelicula: string) {
    let funciones: Funcion[] = [];
    this.salaService.getSalas(multiplex).subscribe((salas) => {
      salas.forEach((sala) => {
        this.getFunciones(sala.numero, multiplex).subscribe((funcionesSala) => {
          funcionesSala.forEach((funcion) => {
            if (funcion.peliculaID == pelicula) {
              funciones.push(funcion);
            }
          });
        });
      });
    });
    return funciones;
  }
  //se recive un multiplex y una pelicula y se retorna un arreglo de funciones buscando en todas las salas del multiplex y revisando que este activa
  getFuncionesPeliculaActivas(multiplex: string, pelicula: string) {
    let funciones: Funcion[] = [];
    this.salaService.getSalas(multiplex).subscribe((salas) => {
      salas.forEach((sala) => {
        this.getFunciones(sala.numero, multiplex).subscribe((funcionesSala) => {
          funcionesSala.forEach((funcion) => {
            if (funcion.peliculaID == pelicula && funcion.estado == 'Activo') {
              funciones.push(funcion);
            }
          });
        });
      });
    });
    return funciones;
  }
  //se busca funcion, retornando un observable
  getFuncionObservable(
    id: string,
    numero: number,
    multiplex: string
  ): Observable<Funcion | null> {
    console.log('Valores recibidos: ' + id + ' ' + numero + ' ' + multiplex);
    let doc = this.db
      .doc(`multiplex/${multiplex}`)
      .collection('sala')
      .doc(numero.toString())
      .collection('funcion')
      .doc(id);
    let funcion = doc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          console.log('funcion no encontrada');
          return null;
        } else {
          console.log('funcion encontrada');
          const datos = accion.payload.data() as Funcion;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return funcion;
  }
  //se obtiene una funcion y se retorna el sala en la que se encuentra
  getSalaFuncion(funcion: Funcion, multiplex: string) {
    return this.salaService.getSalas(multiplex).subscribe((salas) => {
      salas.forEach((sala) => {
        this.getFunciones(sala.numero, multiplex).subscribe((funcionesSala) => {
          funcionesSala.forEach((funcionSala) => {
            if (funcionSala.id == funcion.id) {
              console.log('sala encontrada');
              this.sala = sala;
              return sala;
            } else {
              return null;
            }
          });
        });
      });
    });
  }

  //funcion para actualizar funcion
}
