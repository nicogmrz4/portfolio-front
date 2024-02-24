import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../interfaces/skill';
import { HydraResponse } from '@shared/interfaces/hydraResponse';
import { environment } from '../../../../environments/environment.development';
import { SkillDTO } from '../dto/skillDTO';

const TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDg1MjExNjgsImV4cCI6MTcxMjEyMTE2OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4ifQ.NpTkCaBSpsGIfHR-yYapWST3YiIYLNu06I3JkLrIh4zKkNMOAGKwWUnd48nQ9UmowNCf8c6tjuv0E0kKSiv-_Xh7DP6hqI2cIO-Ian0B2dwUCriT0IyVdsHrakihs5rTH8gYf9KMTKymqFnq0a9X4Za5okV_-QCMg07edDfobqJmuPCpaYBIQnoRFxuJ3oS4l3vKRZ8iuUUl_JIaXHNqmhtfKL165GnQbI0CRt4XcAYalS5cN46A61XB0puiPFYyvX3wnAs2xh9IZvE3wP-NU7TxJPPR-syjyJjf3tWVppylHo9Ij495U9sNM8cIQeZMWs1O8HW7XfcngGvbrUN2Ig`;

const URL = environment.apiUrl + '/api/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<HydraResponse<Skill>> {
    return this.http.get<HydraResponse<Skill>>(URL);
  }

  createSkill(skill: SkillDTO): Observable<Skill> {
    return this.http.post<Skill>(URL, skill, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/ld+json',
      },
    });
  }

  editSkill(skill: SkillDTO, id: number): Observable<Skill> {
    return this.http.patch<Skill>(URL + `/${id}`, skill, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/merge-patch+json',
      },
    });
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(URL + `/${id}`,{
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
  }

  uploadSkillIcon(
    preview: File,
    id: number,
  ): Observable<Skill> {
    let formData = new FormData();
    formData.append('file', preview);
    return this.http.post<Skill>(
      URL + `/${id}/image`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN
        },
      },
    );
  }
}
