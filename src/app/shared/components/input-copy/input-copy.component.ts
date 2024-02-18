import { Component } from '@angular/core';

@Component({
  selector: 'app-input-copy',
  templateUrl: './input-copy.component.html',
  styleUrl: './input-copy.component.scss'
})
export class InputCopyComponent {
  disabled: boolean = true;

  copyInputEmail(inputElement: HTMLInputElement) {
    inputElement.disabled = false;
    inputElement.select();
    document.execCommand('copy');
    inputElement.disabled = true;
  }
}
