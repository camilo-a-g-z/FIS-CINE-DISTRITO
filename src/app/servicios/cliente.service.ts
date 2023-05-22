import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class ClienteService {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente | null>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  getClientes(): Observable<Cliente[]> {
    // Obtener los clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.correo = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    //se agrega cliente especificando el id
    this.clientesColeccion.doc(cliente.correo).set(cliente);
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.correo = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.correo}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente: Cliente | null) {
    this.clienteDoc = this.db.doc(`clientes/${cliente!.correo}`);
    this.clienteDoc.delete();
  }
}
