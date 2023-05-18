import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  esRegistro:boolean = true;
  cambioVentana(){
    this.esRegistro = !this.esRegistro;
  }
}