import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const developerAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.getUser();
  return user &&  user.userType.userTypeName==='Developer' ? true : inject(Router).createUrlTree(['noAccess']);
};
