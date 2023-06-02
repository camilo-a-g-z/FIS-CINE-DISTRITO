import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { EmpleadoService } from './empleado.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(
    private authService: AngularFireAuth,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  isLoggedUser: boolean;

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  //login empleado, se realiza misma operacion que en login con la diferentcia que se revisa en la colecion de empleados si pertenece a alguno
  loginEmpleado(cedula: string, password: string) {
    let empleado = new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(cedula, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    }).then((userData) => {
      if (userData) {
        this.empleadoService.getEmpleado(cedula).subscribe((empleado) => {
          if (empleado) {
            this.isLoggedUser = true;
          } else {
            this.isLoggedUser = false;
            alert('Credenciales incorrectas');
          }
        });
      }
    });
  }

  getAuth() {
    return this.authService.authState.pipe(map((auth) => {
      if (auth){
        this.isLoggedUser = true
        return auth
      }else{
        return false
      }
    })); //el map es para que devuelva un booleano
  }

  logout() {
    this.isLoggedUser = false
    this.authService.signOut();
  }

  registrarse(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }
}
