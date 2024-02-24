import { Component, Inject, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogConfig } from './config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent implements OnDestroy {
  accept$: Subject<any> = new Subject()
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ConfirmDialogConfig,
  ) {}

  onAccept() {
    return this.accept$.asObservable();
  }

  ngOnDestroy(): void {
    this.accept$.complete();
  }
}
