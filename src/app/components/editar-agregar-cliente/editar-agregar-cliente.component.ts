import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-agregar-cliente',
  templateUrl: './editar-agregar-cliente.component.html',
  styleUrls: ['./editar-agregar-cliente.component.css'],
})
export class EditarAgregarClienteComponent implements OnInit {
  id: string;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id == '0') {
      //estamos agregando un nuevo empleado
    } else {
      //estamos editando un empleado
    }
  }
}
