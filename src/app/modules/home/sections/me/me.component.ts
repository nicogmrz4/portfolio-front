import { Component } from '@angular/core';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
  standalone: true,
  imports: [
    SectionTitleComponent
  ]
})
export class MeComponent {

}
