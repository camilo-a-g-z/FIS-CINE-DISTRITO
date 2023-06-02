import { Injectable } from '@angular/core';
import { Compra } from '../modelo/compra.model';
import { Funcion } from '../modelo/funcion.model';
import { Sala } from '../modelo/sala.model';
import { FuncionService } from './funcion.service';
import { FacturaService } from './factura.service';
import { Factura } from '../modelo/factura.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  constructor(
    private funcionService: FuncionService,
    private facturaService: FacturaService,
    private loginService: LoginService
  ) {}

  compra: Compra = {
    nomPeli: '',
    sillas: [],
    total: 0,
    multiplex: '',
    hora: '',
    sala: {
      numero: 0,
      sillas: [],
    },
    funcion: {
      empleadoID: '',
      estado: '',
      id: '',
      peliculaID: '',
      sillas: [],
    },
  };

  asignarDatosCompra(
    funcion: Funcion,
    sillas: Array<string>,
    sala: Sala,
    multiplex: string
  ) {
    let lista = funcion.id?.split('_')[0].split('-')!;
    this.compra.hora = lista[0] + lista[1];
    this.compra.multiplex = multiplex;
    this.compra.nomPeli = funcion.peliculaID;
    this.compra.sala = sala;
    this.compra.sillas = sillas;
    this.compra.total = sillas.length * 7000;
    this.compra.funcion = funcion;
  }

  reservarBoletas() {
    //se toman las sillas seleccionadas y se cambia su estado a ocupado
    //se busca la posicion en el arreglo de sillas de la sala y se cambia el estado a ocupado en la funcion
    for (let silla of this.compra.sillas) {
      let pos = this.compra.sala.sillas.indexOf(silla);
      this.compra.funcion.sillas[pos] = 'reservada';
    }
    //se actualiza la funcion
    this.funcionService.actualizarFuncion(
      this.compra.funcion,
      this.compra.sala.numero,
      this.compra.multiplex
    );
    console.log(this.compra.funcion.sillas);
  }

  comprarBoletas() {
    //se toman las sillas seleccionadas y se cambia su estado a ocupado
    //se busca la posicion en el arreglo de sillas de la sala y se cambia el estado a ocupado en la funcion
    for (let silla of this.compra.sillas) {
      let pos = this.compra.sala.sillas.indexOf(silla);
      this.compra.funcion.sillas[pos] = 'ocupado';
    }
    //se actualiza la funcion
    this.funcionService.actualizarFuncion(
      this.compra.funcion,
      this.compra.sala.numero,
      this.compra.multiplex
    );
    let factura: Factura = {
      correo: '',
      fecha: new Date(),
      funcion: {
        idFuncion: this.compra.funcion.id || '',
        multiplex: this.compra.multiplex,
        sala: this.compra.sala.numero,
      },
    };
    this.loginService.getAuth().subscribe((usuario) => {
      if (usuario) {
        factura.correo = usuario.email || '';
        this.facturaService.agregarFacturaNueva(factura);
      }
    });
  }

  cancelarCompra() {
    //se toman las sillas seleccionadas y se cambia su estado a ocupado
    //se busca la posicion en el arreglo de sillas de la sala y se cambia el estado a ocupado en la funcion
    for (let silla of this.compra.sillas) {
      let pos = this.compra.sala.sillas.indexOf(silla);
      this.compra.funcion.sillas[pos] = 'libre';
    }
    //se actualiza la funcion
    this.funcionService.actualizarFuncion(
      this.compra.funcion,
      this.compra.sala.numero,
      this.compra.multiplex
    );
    console.log(this.compra.funcion.sillas);
  }
}
