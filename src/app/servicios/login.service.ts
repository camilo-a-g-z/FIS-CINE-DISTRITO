import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
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
