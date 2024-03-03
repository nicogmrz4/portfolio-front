import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-tooltip',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tooltip.component.html',
	styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
	@Input() activation: 'click' | 'hover' = 'click';
	@Input() tip: string = 'Use "tip" atribute to change this value';
	@Input() position: 'left' | 'right' | 'top' | 'bottom' = 'right';

	toolTipHidden: boolean = true;
	toolTip$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	timeout: any;

	toolTipAnimationEnd(e: AnimationEvent) {
		if (e.animationName != 'tw-fade-out') return;
		this.toolTipHidden = true;
	}

	show() {
		if (this.activation != 'click') return;
		this.cleanTimeoutIfExist();
		this.toolTipHidden = false;
		this.toolTip$.next(true);
		this.timeout = setTimeout(() => this.toolTip$.next(false), 1500);
	}

	onHover() {
		if (this.activation != 'hover') return;
		this.toolTipHidden = false;
		this.toolTip$.next(true);
	}
	
	onLossHover() {
		if (this.activation != 'hover') return;
		this.toolTip$.next(false);
	}

	cleanTimeoutIfExist() {
		if (this.timeout) clearTimeout(this.timeout);
	}
}
