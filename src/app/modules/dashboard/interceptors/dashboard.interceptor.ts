import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoadingLayerService } from '../services/loading-layer.service';

export const dashboardInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router)
  if (router.url.includes('dashboard') == false) return next(req); 

  const loadingSvc: LoadingLayerService = inject(LoadingLayerService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      loadingSvc.loading = false; // hidde loading on error
      return throwError(() => err);
    })
  );
};
