import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Multiplex } from 'src/app/modelo/multiplex.model';
import { MultiplexService } from 'src/app/servicios/multiplex.service';

@Component({
  selector: 'app-editar-agregar-multiplex',
  templateUrl: './editar-agregar-multiplex.component.html',
  styleUrls: ['./editar-agregar-multiplex.component.css'],
})
export class EditarAgregarMultiplexComponent implements OnInit {
  id: string;
  isEdit: boolean;
  multiplex: null | Multiplex = {
    nombre: '',
    direccion: '',
    id: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private multiplexService: MultiplexService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id == '0') {
      //estamos agregando un nuevo multiplex
      this.isEdit = false;
    } else {
      //estamos editando un multiplex
      this.isEdit = true;
      this.multiplexService
        .getMultiplex(this.id)
        .subscribe((multiplex) => (this.multiplex = multiplex));
    }
  }

  guardar({ value, valid }: { value: Multiplex; valid: boolean | null }) {
    if (valid) {
      if (this.isEdit) {
        //modificar
        this.multiplexService.modificarMultiplex(value);
      } else {
        //agregar
        this.multiplexService.agregarMultiplex(value);
      }
      this.router.navigate(['/admin/multiplex']);
    } else {
      console.log('Formulario no valido');
    }
  }
}
