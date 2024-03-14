import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'; 

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly snackbar: MatSnackBar = inject(MatSnackBar);

  open(message: string, action: string = 'Ok', config: MatSnackBarConfig = {}) {
    this.snackbar.open(message, action, {
      duration: 5000,
      ...config
    }); 
  }
}
