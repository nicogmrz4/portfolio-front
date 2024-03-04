import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingLayerService } from '../services/loading-layer.service';

@Component({
	selector: 'app-loading-layer',
	standalone: true,
	imports: [CommonModule, MatProgressSpinner],
	template: `
    <div
    [class.tw-hidden]="!(loadingSvc.loading | async) && canHidde"
    [class.tw-animate-fade-in]="(loadingSvc.loading | async) == true"
    [class.tw-animate-fade-out]="(loadingSvc.loading | async) == false"
    (animationstart)="animationStartHandle($event)"
    (animationend)="animationEndHandle($event)"
    class="tw-fixed tw-bg-black tw-bg-opacity-60 tw-z-50 tw-left-0 tw-top-0 tw-w-lvw tw-h-lvh tw-flex tw-justify-center tw-items-center tw-animate-duration-fast"
    >
      <mat-spinner diameter="80" color="primary"></mat-spinner>
    </div>
  `,
	styles: ``,
})
export class LoadingLayerComponent {
  canHidde: boolean = false;
	constructor(public loadingSvc: LoadingLayerService) {}

  animationStartHandle(e: AnimationEvent): void {
    console.log(e.animationName);
    if (e.animationName != 'tw-fade-in') return;
    this.canHidde = false;
  }

  animationEndHandle(e: AnimationEvent): void {
    if (e.animationName != 'tw-fade-out') return;
    this.canHidde = true;
  }  
  
}
