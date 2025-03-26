import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  // const authToken = authService.getToken();
  const authToken = "xxxxxxxx";
  const router = inject(Router);
  const authReq =req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })


  return next(authReq).pipe(

    catchError(error => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })

  );
};
