import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login-empleado',
  templateUrl: './login-empleado.component.html',
  styleUrls: ['./login-empleado.component.css'],
})
export class LoginEmpleadoComponent implements OnInit {
  cedula: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  login() {
    this.loginService.loginEmpleado(this.cedula, this.password);
  }
}
