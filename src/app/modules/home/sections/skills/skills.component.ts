import { Component, Input, OnInit, inject } from '@angular/core';
import { SkillsService } from '@modules/dashboard/services/skills.service';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { CommonService } from '@modules/home/services/common.service';
import { SectionTitleComponent } from '@shared/components/section-title.component';
import { finalize, retry } from 'rxjs';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrl: './skills.component.scss',
	standalone: true,
	imports: [SkillCardComponent, SectionTitleComponent],
})
export class SkillsComponent implements OnInit {
	private readonly skillSvc: SkillsService = inject(SkillsService);
	private readonly commonSvc: CommonService = inject(CommonService);

	skills: any[] = [];

	ngOnInit(): void {
		const skills$ = this.skillSvc.getSkills();

		skills$
			.pipe(
				retry(4),
				finalize(() => (this.commonSvc.skillSectionContentLoadEnd())),
			)
			.subscribe((res) => (this.skills = res['hydra:member']));
	}
}
