import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  loggedUser: string | null = '';
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLogged = true;
        this.loggedUser = auth.email;
      } else {
        this.isLogged = false;
      }
    });
  }
  logOut() {
    this.loginService.logout();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
