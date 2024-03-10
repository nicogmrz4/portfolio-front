import { Component, OnInit } from '@angular/core';
import { MeComponent } from './sections/me/me.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
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
		LoadingComponent,
	],
	providers: [CommonService],
})
export class HomeComponent implements OnInit {
	loading: boolean = true;
	constructor(private commonSvc: CommonService) {}

	ngOnInit(): void {
		document.querySelector('body')?.classList.add('tw-overflow-hidden');
		let projectSectionContentLoadEnd$ =
			this.commonSvc.projectSectionContentLoadEnd$;
		let skillSectionContentLoadEnd$ =
			this.commonSvc.skillSectionContentLoadEnd$;

		forkJoin([
			projectSectionContentLoadEnd$,
			skillSectionContentLoadEnd$,
		]).subscribe({
			next: () => {
				this.loading = false;
				document.querySelector('body')?.classList.remove('tw-overflow-hidden');
			},
		});
	}
}
