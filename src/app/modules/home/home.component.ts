import { Component } from '@angular/core';
import { MeComponent } from './sections/me/me.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MeComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ]
})
export class HomeComponent {

}
