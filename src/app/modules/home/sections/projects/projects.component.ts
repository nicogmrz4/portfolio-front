import { Component, OnInit, inject } from '@angular/core';
import { Project } from '@modules/dashboard/interfaces/project';
import { ProjectsService } from '@modules/dashboard/services/projects.service';
import { ProjectCardComponent } from '@modules/home/components/project-card/project-card.component';
import { CommonService } from '@modules/home/services/common.service';
import { SectionTitleComponent } from '@shared/components/section-title.component';
import { finalize, retry } from 'rxjs';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss',
	standalone: true,
	imports: [ProjectCardComponent, SectionTitleComponent],
})
export class ProjectsComponent implements OnInit {
	private readonly projectSvc: ProjectsService = inject(ProjectsService);
	private readonly commonSvc: CommonService = inject(CommonService);

	projects: Project[] = [];

	ngOnInit(): void {
		const projects$ = this.projectSvc.getProjects();

		projects$
			.pipe(
				retry(4),
				finalize(() => (this.commonSvc.projectSectionContentLoadEnd())),
			)
			.subscribe((res) => (this.projects = res['hydra:member']));
	}
}
