import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { PeliculasAdminComponent } from './components/peliculas-admin/peliculas-admin.component';
import { EmpleadosAdminComponent } from './components/empleados-admin/empleados-admin.component';
import { MultiplexAdminComponent } from './components/multiplex-admin/multiplex-admin.component';
import { LoginEmpleadoComponent } from './components/login-empleado/login-empleado.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { EditarAgregarClienteComponent } from './components/editar-agregar-cliente/editar-agregar-cliente.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PagoComponent } from './components/pago/pago.component';
import { EditarAgregarPeliculaComponent } from './components/editar-agregar-pelicula/editar-agregar-pelicula.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'catalog',
    component: CatalogComponent,
    children: [{ path: 'funciones', component: FuncionesComponent }],
  },
  { path: 'catalog', component: CatalogComponent },
  { path: 'funciones', component: FuncionesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'empleados', component: EmpleadosAdminComponent },
      { path: 'multiplex', component: MultiplexAdminComponent },
      { path: 'peliculas', component: PeliculasAdminComponent },
      { path: 'editar-agregar/:id', component: EditarAgregarClienteComponent },
      {
        path: 'editar-agregar-pelicula/:id',
        component: EditarAgregarPeliculaComponent,
      },
    ],
  },
  { path: 'loginEmplado', component: LoginEmpleadoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
