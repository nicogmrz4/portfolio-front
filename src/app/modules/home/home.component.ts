import { Component, OnInit } from '@angular/core';
import { MeComponent } from './sections/me/me.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { asyncScheduler, forkJoin, mergeAll, scheduled } from 'rxjs';
import { Project } from '@modules/dashboard/interfaces/project';
import { Skill } from '@modules/dashboard/interfaces/skill';
import { LoadingComponent } from './components/loading/loading.component';

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
    HttpClientModule,
    LoadingComponent
  ],
  providers: [
    CommonService
  ]
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  projects: Project[] = [];
  skills: Skill[] = [];
  constructor(private commonSvc: CommonService) {}

  ngOnInit(): void {
    document.querySelector('body')?.classList.add('tw-overflow-hidden')
    let projects$ = this.commonSvc.getProjects();
    let skills$ = this.commonSvc.getSkills();

    forkJoin([projects$, skills$]).subscribe({
      next: ([projectsRes, skillsRes]) => {
        this.projects = projectsRes['hydra:member'];
        this.skills = skillsRes['hydra:member'];
        this.loading = false;
      },
      complete: () => {
        document.querySelector('body')?.classList.remove('tw-overflow-hidden')
      },
      error: (err) => console.log(err)
    })
  }
}
