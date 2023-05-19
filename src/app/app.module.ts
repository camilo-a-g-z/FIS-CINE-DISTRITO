import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestoreModule,
  SETTINGS,
  Settings,
} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { LoginService } from './servicios/login.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'cine-distrito'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
