import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelo/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.css'],
})
export class EmpleadosAdminComponent implements OnInit {
  empleados: Empleado[];

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });
  }
  agregarEmpleado() {
    this.router.navigate(['admin/editar-agregar', '0']);
  }
  editarEmpleado(empleado: Empleado) {
    this.router.navigate(['admin/editar-agregar', empleado.correo]);
  }
  eliminarEmpleado(empleado: Empleado) {
    if (confirm('¿Está seguro de eliminar el empleado?')) {
      this.empleadoService.eliminarEmpleado(empleado);
      this.router.navigate(['/admin/empleados']);
    }
  }
}
