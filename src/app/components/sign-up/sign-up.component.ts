import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  registro() {
    this.clienteService.agregarCliente({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.email,
      puntosDistrito: 0,
    });
    this.loginService
      .registrarse(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
