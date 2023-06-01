import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  constructor(private router: Router) {}
  cancelar() {
    this.router.navigate(['/']);
  }
  terminar() {
    this.router.navigate(['/resumenPago']);
  }
}
