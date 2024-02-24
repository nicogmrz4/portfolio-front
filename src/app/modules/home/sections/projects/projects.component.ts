import { Component } from '@angular/core';
import { ProjectCardComponent } from '@modules/home/components/project-card/project-card.component';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [
    ProjectCardComponent,
    SectionTitleComponent
  ]
})
export class ProjectsComponent {

}
