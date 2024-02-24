import { Component } from '@angular/core';
import { InputCopyComponent } from '@shared/components/input-copy/input-copy.component';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [
    SectionTitleComponent,
    InputCopyComponent
  ]
})
export class ContactComponent {

}
