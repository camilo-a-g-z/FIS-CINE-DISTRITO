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
import { FooterComponent } from './components/footer/footer.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PeliculaService } from './servicios/pelicula.service';
import { ClienteService } from './servicios/cliente.service';
import { SeleccionFuncionComponentComponent } from './components/seleccion-funcion-component/seleccion-funcion-component.component';
import { SeleccionSillasComponentComponent } from './components/seleccion-sillas-component/seleccion-sillas-component.component';
import { ResumenCompraComponentComponent } from './components/resumen-compra-component/resumen-compra-component.component';
import { AdminComponent } from './components/admin/admin.component';
import { PeliculasAdminComponent } from './components/peliculas-admin/peliculas-admin.component';
import { EmpleadosAdminComponent } from './components/empleados-admin/empleados-admin.component';
import { MultiplexAdminComponent } from './components/multiplex-admin/multiplex-admin.component';
import { LoginEmpleadoComponent } from './components/login-empleado/login-empleado.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { EditarAgregarClienteComponent } from './components/editar-agregar-cliente/editar-agregar-cliente.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PagoComponent } from './components/pago/pago.component';
import { EditarAgregarPeliculaComponent } from './components/editar-agregar-pelicula/editar-agregar-pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CatalogComponent,
    SignUpComponent,
    SeleccionFuncionComponentComponent,
    SeleccionSillasComponentComponent,
    ResumenCompraComponentComponent,
    AdminComponent,
    PeliculasAdminComponent,
    EmpleadosAdminComponent,
    MultiplexAdminComponent,
    LoginEmpleadoComponent,
    FuncionesComponent,
    EditarAgregarClienteComponent,
    CarruselComponent,
    CarritoComponent,
    PagoComponent,
    EditarAgregarPeliculaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'cine-distrito'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [LoginService, PeliculaService, ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
