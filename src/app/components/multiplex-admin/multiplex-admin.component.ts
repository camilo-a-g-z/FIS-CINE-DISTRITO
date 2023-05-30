import { Component, OnInit } from '@angular/core';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { MultiplexService } from 'src/app/servicios/multiplex.service';

@Component({
  selector: 'app-multiplex-admin',
  templateUrl: './multiplex-admin.component.html',
  styleUrls: ['./multiplex-admin.component.css'],
})
export class MultiplexAdminComponent implements OnInit {
  multiplexes: Multiplex[];
  multiplex: Multiplex;
  constructor(private multiplexService: MultiplexService) {}
  ngOnInit(): void {
    this.multiplexService.getMultiplexes().subscribe((multiplexes) => {
      this.multiplexes = multiplexes;
    });
  }
  mostrar() {
    console.log('Hola');
  }
}
