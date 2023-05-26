import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelo/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.css'],
})
export class EmpleadosAdminComponent implements OnInit {
  empleados: Empleado[];

  constructor(private empleadoService: EmpleadoService) {}
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });
  }
}
