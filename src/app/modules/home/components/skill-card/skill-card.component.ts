import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
  standalone: true
})
export class SkillCardComponent {
  @Input() name: string = '';
  @Input() icon: string = '';
  @Input() dataUrl: string = '';
  @Input() size: number = 150;
  url: string = environment.apiUrl;
}
