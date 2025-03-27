import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.getUser();

  return user &&  user.userType.userTypeName==='Admin' ? true : inject(Router).createUrlTree(['noAccess']);
};
