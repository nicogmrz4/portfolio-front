import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { ProjectDTO } from '../dto/projectDTO';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProjectTag } from '../interfaces/projectTag';
import { ProjectTagDTO } from '../dto/projectTagDTO';

const URL = environment.apiUrl + '/api/projects';
const PROJECT_TAGS_URL = environment.apiUrl + '/api/project_tags';

@Injectable({
	providedIn: 'root',
})
export class ProjectsService {
	constructor(private http: HttpClient) {}

	getProjects(page: number = 1) {
		return this.http.get<HydraResponse<Project>>(URL, {
			params: { page },
		});
	}

	createProject(project: ProjectDTO): Observable<Project> {
		return this.http.post<Project>(URL, project, {
			headers: {
				'Content-Type': 'application/ld+json',
			},
		});
	}

	editProject(project: ProjectDTO, id: number): Observable<Project> {
		return this.http.patch<Project>(URL + `/${id}`, project, {
			headers: {
				'Content-Type': 'application/merge-patch+json',
			},
		});
	}

	deleteProject(id: number): Observable<any> {
		return this.http.delete(URL + `/${id}`);
	}

	uploadProjectPreview(preview: File, id: number): Observable<Project> {
		let formData = new FormData();
		formData.append('file', preview);
		return this.http.post<Project>(URL + `/${id}/image`, formData);
	}

	getProjectsTags(page: number = 1) {
		return this.http.get<HydraResponse<ProjectTag>>(PROJECT_TAGS_URL, {
			params: { page },
		});
	}

	createProjectsTags(projectTag: ProjectTagDTO) {
		return this.http.post<ProjectTag>(PROJECT_TAGS_URL, projectTag, {
			headers: {
				'Content-Type': 'application/ld+json',
			},
		});
	}
}
