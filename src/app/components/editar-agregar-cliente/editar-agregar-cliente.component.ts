import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelo/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-editar-agregar-cliente',
  templateUrl: './editar-agregar-cliente.component.html',
  styleUrls: ['./editar-agregar-cliente.component.css'],
})
export class EditarAgregarClienteComponent implements OnInit {
  id: string;
  isEdit: boolean;
  empleado: null | Empleado = {
    apellido: '',
    cedula: '',
    nombre: '',
    salario: 0,
    multiplex: '',
    numTelefono: '',
    fechaContrato: null,
    correo: '',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id == '0') {
      //estamos agregando un nuevo empleado
      this.isEdit = false;
    } else {
      //estamos editando un empleado
      this.isEdit = true;
      this.empleadoService.getEmpleado(this.id).subscribe((empleado) => {
        this.empleado = empleado;
      });
    }
  }
  guardar({ value, valid }: { value: Empleado; valid: boolean | null }) {
    if (valid) {
      if (this.isEdit) {
        //modificar
        this.empleadoService.modificarEmpleado(value);
      } else {
        //agregar
        this.empleadoService.agregarEmpleado(value);
      }
      this.router.navigate(['/admin/empleados']);
    } else {
      console.log('Formulario no valido');
    }
  }
}
