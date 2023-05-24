import { Injectable } from '@angular/core';
import { AngularFirestore, fromCollectionRef} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Sala } from '../modelo/sala.model';
import { Factura } from '../modelo/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  //EN CONSTRUCCION

  constructor(private db: AngularFirestore) { }

  getFacturas(correo:string): Observable<Factura[]> {
    // Obtenemos las peliculas)
    let colec = this.db.collection("facturas",ref => ref.where("correo","==",correo))
    let facturas = colec.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Factura;
          return datos;
        });
      })
    );
    return facturas
  }

  agregarFacturaNueva(factura:Factura,correo:string) {
    let colec = this.db.collection("facturas",ref => ref.where("correo","==",correo))
    colec.add(factura);
  }

  getFactura(correo:string, id:string) {
    let doc = this.db.collection("facturas",ref => ref.where("correo","==",correo)).doc(id)
    let factura = doc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Sala;
          return datos;
        }
      })
    );
    return factura;
  }

  eliminarFactura(correo:string, id:string) {
    let doc = this.db.collection("facturas",ref => ref.where("correo","==",correo)).doc(id)
    doc.delete();
  }


}
