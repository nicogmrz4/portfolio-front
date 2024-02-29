import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { ProjectDTO } from '../dto/projectDTO';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProjectTag } from '../interfaces/projectTag';
import { ProjectTagDTO } from '../dto/projectTagDTO';

const TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDg1MjExNjgsImV4cCI6MTcxMjEyMTE2OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4ifQ.NpTkCaBSpsGIfHR-yYapWST3YiIYLNu06I3JkLrIh4zKkNMOAGKwWUnd48nQ9UmowNCf8c6tjuv0E0kKSiv-_Xh7DP6hqI2cIO-Ian0B2dwUCriT0IyVdsHrakihs5rTH8gYf9KMTKymqFnq0a9X4Za5okV_-QCMg07edDfobqJmuPCpaYBIQnoRFxuJ3oS4l3vKRZ8iuUUl_JIaXHNqmhtfKL165GnQbI0CRt4XcAYalS5cN46A61XB0puiPFYyvX3wnAs2xh9IZvE3wP-NU7TxJPPR-syjyJjf3tWVppylHo9Ij495U9sNM8cIQeZMWs1O8HW7XfcngGvbrUN2Ig`;

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
				Authorization: 'Bearer ' + TOKEN,
				'Content-Type': 'application/ld+json',
			},
		});
	}

	editProject(project: ProjectDTO, id: number): Observable<Project> {
		return this.http.patch<Project>(URL + `/${id}`, project, {
			headers: {
				Authorization: 'Bearer ' + TOKEN,
				'Content-Type': 'application/merge-patch+json',
			},
		});
	}

	deleteProject(id: number): Observable<any> {
		return this.http.delete(URL + `/${id}`, {
			headers: {
				Authorization: 'Bearer ' + TOKEN,
			},
		});
	}

	uploadProjectPreview(preview: File, id: number): Observable<Project> {
		let formData = new FormData();
		formData.append('file', preview);
		return this.http.post<Project>(URL + `/${id}/image`, formData, {
			headers: {
				Authorization: 'Bearer ' + TOKEN,
			},
		});
	}

	getProjectsTags(page: number = 1) {
		return this.http.get<HydraResponse<ProjectTag>>(PROJECT_TAGS_URL, {
			params: { page },
		});
	}

	createProjectsTags(projectTag: ProjectTagDTO) {
		return this.http.post<ProjectTag>(PROJECT_TAGS_URL, projectTag, {
			headers: {
				Authorization: 'Bearer ' + TOKEN,
				'Content-Type': 'application/ld+json',
			},
		});
	}
}
