import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { EmpleadoService } from './empleado.service';

@Injectable()
export class LoginService {
  constructor(
    private authService: AngularFireAuth,
    private empleadoService: EmpleadoService
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
    });
    //se comprueba si el usuario existe en la coleccion de empleados
    empleado.then((userData) => {
      if (userData) {
        this.empleadoService.getEmpleado(cedula).subscribe((empleado) => {
          if (empleado) {
            this.isLoggedUser = true;
          } else {
            this.isLoggedUser = false;
          }
        });
      }
    });
    return this.isLoggedUser;
  }

  getAuth() {
    return this.authService.authState.pipe(map((auth) => auth)); //el map es para que devuelva un booleano
  }

  logout() {
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
