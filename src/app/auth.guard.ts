import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  return localStorage.getItem('auth_token') ? true : inject(Router).createUrlTree(['/home']);

  return true; // Allow access

};
