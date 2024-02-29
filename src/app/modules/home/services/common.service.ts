import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { Observable } from 'rxjs';
import { Skill } from '@modules/dashboard/interfaces/skill';
import { Project } from '@modules/dashboard/interfaces/project';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getProjects(page: number = 1): Observable<HydraResponse<Project>> {
    return this.http.get<HydraResponse<Project>>(env.apiUrl + '/api/projects', {
      params: {
        page
      }
    });
  }

  getSkills(page: number = 1): Observable<HydraResponse<Skill>>  {
    return this.http.get<HydraResponse<Skill>>(env.apiUrl + '/api/skills', {
      params: {
        page
      }
    });
  }
}
