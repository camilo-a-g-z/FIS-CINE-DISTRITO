import { Component, OnInit } from '@angular/core';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { Sala } from 'src/app/modelo/sala.model';
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
  salas: Sala[];
  sala: Sala = {
    numero: 0,
    sillas: [],
  };
  constructor(
    private multiplexService: MultiplexService,
    private salasService: SalasService
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
  }
}
