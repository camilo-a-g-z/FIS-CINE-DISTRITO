import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './servicios/login.service';



export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(LoginService)
  const router = inject(Router)

  if(usuarioService.isLoggedUser){
    return true
  }else{
    return router.navigate(['login'])
  }
};
