import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { Subject, Observable } from 'rxjs';
import { Skill } from '@modules/dashboard/interfaces/skill';
import { Project } from '@modules/dashboard/interfaces/project';

@Injectable({
	providedIn: 'root',
})
export class CommonService {
	public projectSectionContentLoadEnd$: Subject<boolean> = new Subject();
	public skillSectionContentLoadEnd$: Subject<boolean> = new Subject();

	projectSectionContentLoadEnd() {
		this.projectSectionContentLoadEnd$.next(true);
		this.projectSectionContentLoadEnd$.complete();
	}

	skillSectionContentLoadEnd() {
		this.skillSectionContentLoadEnd$.next(true);
		this.skillSectionContentLoadEnd$.complete();
	}
}
