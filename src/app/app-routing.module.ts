import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { PeliculasAdminComponent } from './components/peliculas-admin/peliculas-admin.component';
import { EmpleadosAdminComponent } from './components/empleados-admin/empleados-admin.component';
import { MultiplexAdminComponent } from './components/multiplex-admin/multiplex-admin.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin', component: AdminComponent ,
    children:[
      { path: 'empleados', component: EmpleadosAdminComponent },
      { path: 'multiplex', component: MultiplexAdminComponent },
      { path: 'peliculas', component: PeliculasAdminComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
