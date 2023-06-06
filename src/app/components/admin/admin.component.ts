import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
