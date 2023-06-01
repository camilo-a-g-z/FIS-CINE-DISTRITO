import { Injectable } from '@angular/core';
import { Compra } from '../modelo/compra.model';
import { Funcion } from '../modelo/funcion.model';
import { Sala } from '../modelo/sala.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  compra:Compra = {
    nomPeli:"",
    sillas: [],
    total: 0,
    multiplex: "",
    hora : "",
    sala : 0
  }
  constructor() {}

  asignarDatosCompra(funcion:Funcion,sillas:Array<string>,sala:Sala,multiplex:string){
    let lista = funcion.id?.split("_")[0].split("-")!
    this.compra.hora = lista[0] + ":" + lista[1]
    this.compra.multiplex = multiplex
    this.compra.nomPeli = funcion.peliculaID
    this.compra.sala = sala.numero
    this.compra.sillas = sillas
    this.compra.total = sillas.length * 7000
  }

}
