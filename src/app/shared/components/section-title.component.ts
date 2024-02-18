import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `<h3 class="font-semibold text-3xl">{{ title }}</h3>`,
  styles: ``,
  encapsulation: ViewEncapsulation.None
})
export class SectionTitleComponent {
  @Input() title: string = 'Section title!';
}
