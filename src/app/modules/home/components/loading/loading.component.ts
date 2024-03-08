import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [CommonModule],
	template: `
		@if (loading || !fadeOutAnimationEnd) {
			<div
				[class.tw-animate-fade-out]="!loading && !fadeOutAnimationEnd"
				(animationend)="animationEndHandle($event)"
				class="tw-bg-rich-black-darker tw-w-lvw tw-min-h-lvh tw-fixed tw-left-0 tw-top-0  tw-flex tw-justify-center tw-items-center tw-animate-duration-fast"
			>
				<div class="tw-animate-fade-in tw-animate-duration-fast">
					<div class="loader tw-bg-primary"></div>
				</div>
			</div>
		}
	`,
	styles: `
		.loader {
			width: 65px;
			padding: 12px;
			aspect-ratio: 1;
			border-radius: 50%;
			--_m: conic-gradient(#0000 10%, #000),
				linear-gradient(#000 0 0) content-box;
			-webkit-mask: var(--_m);
			mask: var(--_m);
			-webkit-mask-composite: source-out;
			mask-composite: subtract;
			animation: l3 1s infinite linear;
		}
		@keyframes l3 {
			to {
				transform: rotate(1turn);
			}
		}
	`,
})
export class LoadingComponent {
	@Input() loading: boolean = false;
	fadeOutAnimationEnd: boolean = false;

	animationEndHandle(e: AnimationEvent) {
		if (e.animationName != 'tw-fade-out') return;
		this.fadeOutAnimationEnd = true;
	}
}
