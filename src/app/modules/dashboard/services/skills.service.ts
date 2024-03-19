import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../interfaces/skill';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { environment } from '../../../../environments/environment';
import { SkillDTO } from '../dto/skillDTO';

const URL = environment.apiUrl + '/api/skills';

@Injectable({
	providedIn: 'root',
})
export class SkillsService {
	constructor(private http: HttpClient) {}

	getSkills(): Observable<HydraResponse<Skill>> {
		return this.http.get<HydraResponse<Skill>>(URL);
	}

	createSkill(skill: SkillDTO): Observable<Skill> {
		return this.http.post<Skill>(URL, skill, {
			headers: {
				'Content-Type': 'application/ld+json',
			},
		});
	}

	editSkill(skill: SkillDTO, id: number): Observable<Skill> {
		return this.http.patch<Skill>(URL + `/${id}`, skill, {
			headers: {
				'Content-Type': 'application/merge-patch+json',
			},
		});
	}

	deleteSkill(id: number): Observable<any> {
		return this.http.delete(URL + `/${id}`);
	}

	uploadSkillIcon(preview: File, id: number): Observable<Skill> {
		let formData = new FormData();
		formData.append('file', preview);
		return this.http.post<Skill>(URL + `/${id}/image`, formData);
	}
}
