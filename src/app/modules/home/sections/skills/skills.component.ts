import { Component } from '@angular/core';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  standalone: true,
  imports: [
    SkillCardComponent,
    SectionTitleComponent
  ]
})
export class SkillsComponent {

}
