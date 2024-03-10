import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthCredentials } from '../interfaces/authCredentials';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { JWT } from '../interfaces/jwt';

const URL = environment.apiUrl + '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(creadentials: AuthCredentials): Observable<JWT> {
    return this.http.post<JWT>(URL, creadentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  thereIsToken() {
    return this.getToken() != null;
  }
}
