import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `<h3 class="tw-font-semibold tw-text-3xl">{{ title }}</h3>`,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class SectionTitleComponent {
  @Input() title: string = 'Section title!';
}
