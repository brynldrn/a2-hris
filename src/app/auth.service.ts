import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  private token: String;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: String, password: String): Observable<any> {
    return this.http.post('http://192.168.0.2:8090/api/v1/user/auth', { username: username, password: password })
      .map((res: Response) => {
        const token = res.json() && res.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          return this.token;
        } else {
          return null;
        }
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
    location.href = '/';
  }
}
