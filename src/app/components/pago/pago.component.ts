import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/servicios/compra.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  constructor(private router: Router, private compraService: CompraService) {}
  cancelar() {
    this.compraService.cancelarCompra();
    this.router.navigate(['/']);
  }
  terminar() {
    this.compraService.comprarBoletas();
    this.router.navigate(['/resumenPago']);
  }
}
