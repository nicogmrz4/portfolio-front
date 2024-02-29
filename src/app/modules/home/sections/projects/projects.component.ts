import { Component, OnInit } from '@angular/core';
import { Project } from '@modules/dashboard/interfaces/project';
import { ProjectCardComponent } from '@modules/home/components/project-card/project-card.component';
import { CommonService } from '@modules/home/services/common.service';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [
    ProjectCardComponent,
    SectionTitleComponent
  ],
  providers: [
    CommonService
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = []; 
  
  constructor(private commonSvc: CommonService) {}

  ngOnInit(): void {
    this.commonSvc.getProjects().subscribe(res => this.projects = res['hydra:member']);
  }
}
