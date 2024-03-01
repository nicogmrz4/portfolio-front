import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-section-title',
	template: `
		<h3
			class="tw-font-medium tw-text-4xl tw-text-primary tw-w-fit"
		>
			{{ title }}
		</h3>
	`,
	styles: ``,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
})
export class SectionTitleComponent {
	@Input() title: string = 'Section title!';
}
