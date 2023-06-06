import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from 'src/app/modelo/sala.model';
import { SalasService } from 'src/app/servicios/salas.service';

@Component({
  selector: 'app-editar-agregar-sala',
  templateUrl: './editar-agregar-sala.component.html',
  styleUrls: ['./editar-agregar-sala.component.css'],
})
export class EditarAgregarSalaComponent implements OnInit {
  salaParameter: string;
  filas: number = 0;
  asientosPorFila: number = 0;
  multiplexParameter: string;
  isEdit: boolean;
  sala: null | Sala = {
    numero: 0,
    sillas: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salaService: SalasService
  ) {}
  ngOnInit(): void {
    this.salaParameter = this.route.snapshot.params['sala'];
    this.multiplexParameter = this.route.snapshot.params['multiplex'];
    if (this.salaParameter == '0') {
      //estamos agregando una nueva sala
      this.isEdit = false;
    } else {
      //estamos editando una sala
      this.isEdit = true;
      this.salaService
        .getSala(parseInt(this.salaParameter), this.multiplexParameter)
        .subscribe((sala) => {
          this.sala = sala;
          if (this.sala != null) {
            this.filas = this.obtenerNumeroFilas(this.sala.sillas);
            this.asientosPorFila = this.obtenerCantidadAsientosPorFila(
              this.sala.sillas
            );
          }
        });
    }
  }
  guardar({ value, valid }: { value: Sala; valid: boolean | null }) {
    value.sillas = this.crearPuestos();
    if (valid) {
      if (this.isEdit) {
        //modificar
        this.salaService.modificarSala(value, this.multiplexParameter);
      } else {
        //agregar
        this.salaService.agregarSala(value, this.multiplexParameter);
      }
      this.router.navigate(['/admin/multiplex']);
    } else {
      console.log('Formulario no valido');
    }
  }
  obtenerNumeroFilas(puestos: string[]): number {
    const filas = new Set<string>();
    for (const puesto of puestos) {
      const fila = puesto.charAt(0);
      filas.add(fila);
    }
    return filas.size;
  }

  obtenerCantidadAsientosPorFila(puestos: string[]): number {
    if (puestos.length === 0) {
      return 0;
    }
    const primeraFila = puestos[0].charAt(0);
    let contador = 0;
    for (const puesto of puestos) {
      if (puesto.charAt(0) === primeraFila) {
        contador++;
      } else {
        break;
      }
    }
    return contador;
  }
  //metodo para crear los puestos de la sala
  crearPuestos() {
    let puestos: string[] = [];
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.asientosPorFila; j++) {
        puestos.push(String.fromCharCode(65 + i) + (j + 1));
      }
    }
    return puestos;
  }
}
