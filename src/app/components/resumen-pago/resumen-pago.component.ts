import { Component } from '@angular/core';
import { Compra } from 'src/app/modelo/compra.model';
import { CompraService } from 'src/app/servicios/compra.service';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.css']
})
export class ResumenPagoComponent {
  compra:Compra
  stringSillas:string = ""
  cargado:boolean = false
  constructor(private compraService:CompraService){}

  ngAfterViewInit(){
    console.log(this.compra)
    this.compra = this.compraService.compra
    for(let silla of this.compra.sillas){
      this.stringSillas += silla + " "
    }
    this.cargado = true
  }
}
