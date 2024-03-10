import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method == 'get') return next(req);
  const authSvc: AuthService = inject(AuthService);
  const token = authSvc.getToken();

  if (token == null) return next(req); // if token is null just return req without authorization header

  const reqClone = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authSvc.getToken())
  })

  return next(reqClone);
};
