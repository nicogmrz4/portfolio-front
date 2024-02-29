import { Component } from '@angular/core';
import { MeComponent } from './sections/me/me.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CommonService } from './services/common.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MeComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    HttpClientModule
  ],
  providers: [
    CommonService
  ]
})
export class HomeComponent {
  constructor(private commonSvc: CommonService) {}

  ngOnInit() {
    this.commonSvc.getProjects().subscribe();
    this.commonSvc.getSkills().subscribe();
  }
}
