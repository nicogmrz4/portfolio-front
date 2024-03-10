import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthErrorHandler } from '../handlers/authErrorHandler';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authErrorHandler = inject(AuthErrorHandler);

  return next(req).pipe(
    catchError(authErrorHandler.getHandler())
  );
};