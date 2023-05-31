import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { FuncionService } from 'src/app/servicios/funcion.service';
import { MultiplexService } from 'src/app/servicios/multiplex.service';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { SalasService } from 'src/app/servicios/salas.service';

@Component({
  selector: 'app-editar-agregar-funcion',
  templateUrl: './editar-agregar-funcion.component.html',
  styleUrls: ['./editar-agregar-funcion.component.css'],
})
export class EditarAgregarFuncionComponent implements OnInit {
  id: string;
  multiplexParameter: string;
  salaParameter: string;
  isEdit: boolean;
  multiplexes: Multiplex[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private multiplexService: MultiplexService,
    private funcionService: FuncionService,
    private salaService: SalasService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.multiplexParameter = this.route.snapshot.params['multiplex'];
    this.salaParameter = this.route.snapshot.params['sala'];
    if (this.id == '0') {
      //estamos agregando un nuevo empleado
      this.isEdit = false;
    } else {
      //estamos editando un empleado
      this.isEdit = true;
    }
  }
}
