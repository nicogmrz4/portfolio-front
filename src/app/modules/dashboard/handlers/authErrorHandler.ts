import { HttpErrorResponse } from '@angular/common/http';
import { JWTError } from '../interfaces/jwtError';
import { EMPTY, throwError } from 'rxjs';
import {
	INVALID_CREDENTIALS,
	INVALID_TOKEN,
	TOKEN_NOT_FOUND,
} from '../utils/errorMessages';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthErrorHandler {
	private readonly authSvc = inject(AuthService);
	private readonly router = inject(Router);

	private handle(errRes: HttpErrorResponse & { error: JWTError }) {
		if (errRes.status != 401) return EMPTY;

		const errMessage = errRes.error.message;

		if (errMessage == INVALID_CREDENTIALS) return EMPTY; // if the error is invalid credential do nohting

		if (errMessage == INVALID_TOKEN || errMessage == TOKEN_NOT_FOUND) {
			this.authSvc.unsetTokenIfExist();
			this.router.navigate(['/']);

			return EMPTY;
		}

		return throwError(() => 'Unhandeable authentication error has been produced');
	}

    getHandler() {
        return this.handle.bind(this);
    }
}
