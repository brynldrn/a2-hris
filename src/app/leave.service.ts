import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class LeaveService {

  constructor(private http: Http) { }

  getAllLeaves(): Observable<any> {
    return this.http.get('http://192.168.0.2:8090/api/v1/leave');
  }

  getAllHistory(): Observable<any> {
    return this.http.get('http://192.168.0.2:8090/api/v1/leave-history');
  }

  applyLeave(leaveObject): Observable<any> {
    return this.http.post('http://192.168.0.2:8090/api/v1/leave', leaveObject).map(res => {
      if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
        return false;
      } else {
        return true;
      }
    });
  }

  approveLeave(leaveObject): Observable<any> {
    return this.http.put('http://192.168.0.2:8090/api/v1/leave/approve/' + leaveObject._id, {}).map(res => {
      if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
        return false;
      } else {
        return true;
      }
    });
  }

  rejectLeave(leaveObject): Observable<any> {
    return this.http.put('http://192.168.0.2:8090/api/v1/leave/reject/' + leaveObject._id, {}).map(res => {
      if (res.json().hasOwnProperty('errors') || res.json().hasOwnProperty('message')) {
        return false;
      } else {
        return true;
      }
    });
  }

}
