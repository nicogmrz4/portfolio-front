import { Component, Input } from '@angular/core';
import { Project } from '@modules/dashboard/interfaces/project';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  standalone: true
})
export class ProjectCardComponent {
  @Input() project!: Project;
  url: string = environment.apiUrl;
 }
