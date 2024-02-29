import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { CommonService } from '@modules/home/services/common.service';
import { SectionTitleComponent } from '@shared/components/section-title.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  standalone: true,
  imports: [
    SkillCardComponent,
    SectionTitleComponent,
  ],
  providers: [
    CommonService
  ]
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];

  constructor(private commonSvc: CommonService) {}

  ngOnInit(): void {
    this.commonSvc.getSkills().subscribe(res => this.skills = res['hydra:member']);
  }
}
