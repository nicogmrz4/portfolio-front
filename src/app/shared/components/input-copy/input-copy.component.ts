import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-copy',
  templateUrl: './input-copy.component.html',
  styleUrl: './input-copy.component.scss',
  standalone: true,
  imports: [ AsyncPipe ]
})
export class InputCopyComponent {
  disabled: boolean = true;
  toolTip: boolean = false;
  toolTip$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  copyInputEmail(inputElement: HTMLInputElement) {
    inputElement.disabled = false;
    inputElement.select();
    document.execCommand('copy');
    inputElement.disabled = true;
    this.showTooltip();
  }
  
  showTooltip() {
    this.toolTip$.next(true);
    setTimeout(() => this.toolTip$.next(false), 500);  
  }
}
