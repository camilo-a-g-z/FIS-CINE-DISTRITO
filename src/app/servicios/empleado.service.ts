import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Empleado } from '../modelo/empleado.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  empleadoColeccion: AngularFirestoreCollection<Empleado>;
  empleadoDoc: AngularFirestoreDocument<Empleado>;
  empleados: Observable<Empleado[]>;
  empleado: Observable<Empleado | null>;
  constructor(private db: AngularFirestore) {
    this.empleadoColeccion = db.collection('empleados', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  getEmpleados(): Observable<Empleado[]> {
    //Obtener los empleados
    this.empleados = this.empleadoColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Empleado;
          datos.cedula = accion.payload.doc.id;
          datos.fechaContrato = accion.payload.doc
            .data()
            .fechaContrato.toDate();
          return datos;
        });
      })
    );
    return this.empleados;
  }
  agregarEmpleado(empleado: Empleado) {
    //se agrega empleado especificando el id
    this.empleadoColeccion.doc(empleado.cedula).set(empleado);
  }
  getEmpleado(id: string) {
    this.empleadoDoc = this.db.doc<Empleado>(`empleados/${id}`);
    this.empleado = this.empleadoDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Empleado;
          datos.cedula = accion.payload.id;
          datos.fechaContrato = accion.payload.data().fechaContrato.toDate();
          return datos;
        }
      })
    );
    return this.empleado;
  }
  modificarEmpleado(empleado: Empleado) {
    this.empleadoDoc = this.db.doc(`empleados/${empleado.cedula}`);
    this.empleadoDoc.update(empleado);
  }
  eliminarEmpleado(empleado: Empleado) {
    this.empleadoDoc = this.db.doc(`empleados/${empleado.cedula}`);
    this.empleadoDoc.delete();
  }
}
