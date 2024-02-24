import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'projects', component: ProjectsPageComponent },
      { path: 'skills', component: SkillsPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
