import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcion } from 'src/app/modelo/funcion.model';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { Sala } from 'src/app/modelo/sala.model';
import { FuncionService } from 'src/app/servicios/funcion.service';
import { MultiplexService } from 'src/app/servicios/multiplex.service';
import { SalasService } from 'src/app/servicios/salas.service';

@Component({
  selector: 'app-multiplex-admin',
  templateUrl: './multiplex-admin.component.html',
  styleUrls: ['./multiplex-admin.component.css'],
})
export class MultiplexAdminComponent implements OnInit {
  multiplexes: Multiplex[];
  multiplex: Multiplex;
  selectedMultiplex: Multiplex;
  selectedSala: Sala;
  salas: Sala[];
  sala: Sala = {
    numero: 0,
    sillas: [],
  };
  funciones: Funcion[];
  funcion: Funcion = {
    id: '',
    empleadoID: '',
    estado: '',
    peliculaID: '',
    sillas: new Map<string, string>(),
  };
  constructor(
    private multiplexService: MultiplexService,
    private salasService: SalasService,
    private funcionService: FuncionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.multiplexService.getMultiplexes().subscribe((multiplexes) => {
      this.multiplexes = multiplexes;
    });
    //this.salas.push(this.sala);
  }
  mostrarSalas(multiplex: Multiplex) {
    //se limpia el array de salas
    this.salas = [];
    this.salasService.getSalasMultiplex(multiplex.nombre).subscribe((salas) => {
      if (salas != null) {
        this.salas = salas;
      } else {
        this.salas = [];
      }
    });
    this.selectedMultiplex = multiplex;
  }

  mostrartFunciones(sala: Sala) {
    //se limpia el array de funciones
    this.funciones = [];
    this.funcionService
      .getFunciones(sala.numero, this.selectedMultiplex.nombre)
      .subscribe((funciones) => {
        if (funciones != null) {
          this.funciones = funciones;
        } else {
          this.funciones = [];
        }
      });
    this.selectedSala = sala;
  }

  agregarMultiplex() {
    this.router.navigate(['admin/editar-agregar-multiplex', '0']);
  }
}
