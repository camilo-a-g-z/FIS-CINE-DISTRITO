import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        console.log('usuario logueado');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
