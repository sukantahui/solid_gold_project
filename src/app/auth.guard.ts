import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token'); // Check for token

  if (!token) {
    const router = new Router(); // Create Router instance
    router.navigate(['/noAccess']); // Redirect to home if token is missing
    return false; // Block access
  }

  return true; // Allow access

};
