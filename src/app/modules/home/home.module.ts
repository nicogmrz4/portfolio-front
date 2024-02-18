import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { MeComponent } from './components/sections/me/me.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { ProjectsComponent } from './components/sections/projects/projects.component';
import { SkillsComponent } from './components/sections/skills/skills.component';
import { ContactComponent } from './components/sections/contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    MeComponent,
    ProjectCardComponent,
    SkillCardComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
