import { Component } from '@angular/core';

@Component({
  selector: 'app-login-empleado',
  templateUrl: './login-empleado.component.html',
  styleUrls: ['./login-empleado.component.css'],
})
export class LoginEmpleadoComponent {
  cedula: string;
  password: string;

  login() {}
}
